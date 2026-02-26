import { RootState } from "@/app/store/rootReducer";
import Header from "@/components/common/Header";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

export default function QuizScreen() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();

  const { tasks } = useSelector((state: RootState) => state.task);

  const quiz = tasks.find((q) => q.id === quizId);

  if (!quiz) {
    return null;
  }

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={["#1C58F2", "#6495ED", "#FFFFFF"]}
        style={{ paddingBottom: 20 }}
      >
        <Header title="Quiz" onBack={() => router.back()} hideProgress />

        <View style={styles.titleRow}>
          <Text style={styles.quizTitle}>{quiz.title}</Text>
          <View style={styles.rewardBadge}>
            <Text style={styles.rewardText}>🎁 {quiz.reward}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Floating White Layer */}
      <View style={styles.whiteLayer}>
        <LinearGradient
          colors={["#8eabf5", "#6495ED", "#FFFFFF"]}
          style={styles.whiteLayer1}
        >
          {/* Scrollable Content */}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>Brief explanation about this quiz</Text>

            <View style={styles.infoRow}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.info}>⏱ {quiz.estimatedTime}</Text>
                <Text style={styles.info}>💰 {quiz.reward} Coins</Text>
                <Text style={styles.info}>⚡ {quiz.difficulty}</Text>
              </View>
            </View>

            <Image
              source={{ uri: quiz.image_url }}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={styles.title}>
              Please read the text below carefully so you can understand it
            </Text>

            <Text style={styles.description}>{quiz.description}</Text>
          </ScrollView>

          {/* Fixed Bottom Button */}
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() =>
              router.push({
                pathname: "/(protected)/(tabs)/home/quiz/questions",
                params: { quizId },
              })
            }
          >
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </LinearGradient>
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

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 8,
    paddingBottom: 12,
  },
  whiteLayer1: {
    flex: 1,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 30,
    overflow: "hidden", // 👈 VERY IMPORTANT
  },

  quizTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1C58F2",
  },

  rewardBadge: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  rewardText: {
    fontWeight: "700",
    color: "#1C58F2",
  },

  whiteLayer: {
    flex: 1,
    backgroundColor: "#fff",
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 16,
  },

  description: {
    fontSize: 15,
    color: "#64748B",
    lineHeight: 22,
    marginBottom: 16,
  },

  infoRow: {
    marginBottom: 24,
  },

  info: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 32,
    color: "#475569",
  },

  nextButton: {
    backgroundColor: "#1C58F2",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 12,
  },

  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
