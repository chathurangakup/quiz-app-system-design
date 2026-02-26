import { RootState } from "@/app/store/rootReducer";
import { fetchQuizById, submitQuiz } from "@/app/store/task/task.thunks";
import { QuizTask } from "@/app/store/task/task.types";
import AppModal from "@/components/common/AppModal";
import Header from "@/components/common/Header";
import LottieLoader from "@/components/common/LottieLoader";
import PrimaryButton from "@/components/common/PrimaryButton";
import ProgressBar from "@/components/home/ProgressBar";
import { images } from "@/constants/images";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

type QuizAnswer = {
  option_id: string;
  user_submit_ans: string;
};

export default function QuestionsScreen() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const dispatch = useDispatch<any>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const selectedQuiz: QuizTask | null = useSelector(
    (state: RootState) => state.task.selectedTask,
  );

  const { loading } = useSelector((state: RootState) => state.task);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<QuizAnswer | null>(null);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);

  // FETCH QUIZ
  useEffect(() => {
    if (quizId) {
      dispatch(fetchQuizById(quizId));
    }
  }, [quizId]);

  // RESTORE ANSWER WHEN USER GO BACK
  useEffect(() => {
    setSelectedOption(answers[currentIndex] ?? null);
  }, [currentIndex]);

  if (!selectedQuiz || !selectedQuiz.questions?.length) {
    return (
      <View style={[styles.screen, styles.center]}>
        <Text style={{ color: "#fff" }}>Loading Quiz...</Text>
      </View>
    );
  }

  const currentQuestion = selectedQuiz.questions[currentIndex];
  const isLastQuestion = currentIndex === selectedQuiz.questions.length - 1;

  const handleSelectOption = (optionId: string, optionText: string) => {
    setSelectedOption({
      option_id: optionId,
      user_submit_ans: optionText,
    });
  };

  const handleNext = async () => {
    if (!selectedOption) return;

    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = selectedOption;

    setAnswers(updatedAnswers);

    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      try {
        console.log("FINAL API BODY", {
          answers: updatedAnswers,
        });

        const response = await dispatch(
          submitQuiz({
            quizId,
            answers: updatedAnswers,
          }),
        ).unwrap();

        console.log("SUBMISSION RESPONSE", response);

        if (response?.message) {
          setTimeout(() => {
            setShowSuccessModal(true);
          }, 2000); // ⏱ 2 seconds delay
        }
      } catch (error) {
        console.error("Submit quiz failed:", error);
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  console.log("CURRENT QUESTION", currentQuestion);

  return (
    <View style={styles.screen}>
      <AppModal
        image={images.success}
        bgImage={images.bgsuccess}
        visible={showSuccessModal}
        title="Successful 🎉"
        description="Please wait a moment, we are preparing for you..."
        buttonText="Back to Home"
        onClose={() => setShowSuccessModal(false)}
        onPress={() => {
          setShowSuccessModal(false);
          router.replace("/(protected)/(tabs)/home/home");
        }}
      />
      <LinearGradient
        colors={["#1C58F2", "#6495ED", "#FFFFFF"]} // Blue -> Light Blue -> White
        style={styles.container1}
      >
        <Header title="Questions" onBack={() => router.back()} hideProgress />

        <LottieLoader visible={loading} />

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 20,
          }}
        >
          <Text style={styles.counter}>
            Question {currentIndex + 1} of {selectedQuiz.questions.length}
          </Text>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={images.loginWrite}
              style={styles.loginImage}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 8 }}>
          <ProgressBar
            progress={(currentIndex + 1) / selectedQuiz.questions.length}
            height={12}
          />
        </View>
      </LinearGradient>

      <View style={styles.whiteLayerMain}>
        <View style={styles.whiteLayer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.question}>
              <Text style={styles.questionNumber}>{currentIndex + 1}.</Text>
              {currentQuestion.question}
            </Text>

            {currentQuestion.options.map((option: string, idx: number) => {
              const isSelected =
                selectedOption?.option_id === `${currentQuestion.id}_${idx}`;

              return (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.optionRow,
                    isSelected && styles.selectedOption,
                  ]}
                  onPress={() =>
                    handleSelectOption(
                      `${currentQuestion.id}_${idx}`, // unique id
                      option,
                    )
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Text
                      style={[
                        styles.optionIndex,
                        isSelected && styles.selectedIndex,
                      ]}
                    >
                      {idx + 1}.
                    </Text>

                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.selectedText,
                      ]}
                    >
                      {option}
                    </Text>
                  </View>

                  {isSelected && (
                    <View style={styles.tickCircle}>
                      <Text style={styles.tick}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.bottomBar}>
            <TouchableOpacity
              onPress={handlePrevious}
              disabled={currentIndex === 0}
            >
              <Text style={styles.arrow}>⬅</Text>
            </TouchableOpacity>

            <PrimaryButton
              title={isLastQuestion ? "Submit" : "Next"}
              onPress={handleNext}
              style={[
                styles.nextButton,
                !selectedOption && styles.nextDisabled,
              ]}
              disabled={!selectedOption}
              variant="secondary"
            />

            <TouchableOpacity onPress={handleNext} disabled={!selectedOption}>
              <Text style={styles.arrow}>➡</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#1C58F2",
    paddingTop: 40,
  },

  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginImage: {
    width: 220,
    height: 160,
    marginBottom: 16,
    alignContent: "center",
  },
  container1: {},

  counter: {
    color: "#111827",
    paddingLeft: 40,
    marginTop: 8,
    fontWeight: "600",
    fontSize: 20,
  },
  whiteLayerMain: {
    flex: 1,
    backgroundColor: "#fff",
  },
  whiteLayer: {
    flex: 1,
    backgroundColor: "#fff",

    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
  },

  question: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 40,
    color: "#111827",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: "transparent",
  },

  selectedIndex: {
    color: "#1C58F2",
  },

  tickCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#1C58F2",
    justifyContent: "center",
    alignItems: "center",
  },

  tick: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  option: {
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    width: "90%",
  },

  optionText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1C58F2",
  },
  questionNumber: {
    fontWeight: "700",
    color: "#1C58F2",
  },

  optionSelected: {
    backgroundColor: "#DBEAFE",
    borderWidth: 1,
    borderColor: "#1C58F2",
  },

  optionIndex: {
    fontWeight: "700",
    marginRight: 10,
    color: "#1C58F2",
  },

  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingBottom: 32,
  },

  nextButton: {
    backgroundColor: "#1C58F2",

    paddingVertical: 14,
    borderRadius: 30,
    width: 200,
  },

  nextDisabled: {
    backgroundColor: "#9CA3AF",
  },

  nextText: {
    color: "#fff",
    fontWeight: "700",
  },

  arrow: {
    fontSize: 22,
    backgroundColor: "#E5E7EB",
    padding: 10,
    borderRadius: 30,
  },
  selectedOption: {
    backgroundColor: "#DBEAFE",
    borderWidth: 2,
    borderColor: "#2563EB",
  },

  selectedText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000", // 👈 black text always
  },
});
