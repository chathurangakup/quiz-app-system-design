import { RootState } from "@/app/store/rootReducer";
import { fetchQuizzes } from "@/app/store/task/task.thunks";
import SearchBar from "@/components/home/SearchBar";
import { images } from "@/constants/images";
import { LinearGradient } from "expo-linear-gradient"; // Ensure this is imported
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const difficulties = [
  { label: "Easy", value: "EASY" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Hard", value: "HARD" },
] as const;

export default function HomeScreen() {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { tasks, loading } = useSelector((state: RootState) => state.task);

  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "EASY" | "MEDIUM" | "HARD"
  >("EASY");

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchQuizzes("EASY"));
    }, []),
  );

  // console.log("Selected Difficulty:", tasks);

  function DifficultyButton({
    label,
    value,
  }: {
    label: string;
    value: "EASY" | "MEDIUM" | "HARD";
  }) {
    const isActive = selectedDifficulty === value;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setSelectedDifficulty(value);
          dispatch(fetchQuizzes(value));
        }}
        // The outer view provides the "base" shadow
        style={[
          styles.bubbleContainer,
          isActive && styles.activeBubbleContainer,
        ]}
      >
        <LinearGradient
          // These colors create the "curved" surface look
          colors={
            isActive
              ? ["#4A80FF", "#1C58F2"] // Active: Darker blue gradient
              : ["#FFFFFF", "#E6EEFF"] // Inactive: White to light blue-grey
          }
          style={styles.bubbleGradient}
        >
          <Text style={[styles.levelText, isActive && styles.activeLevelText]}>
            {label}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function QuizCard({ item }: { item: any }) {
    const isDisabled = item.isdisabled === true;

    return (
      <TouchableOpacity
        style={[styles.card, isDisabled && styles.disabledCard]}
        activeOpacity={isDisabled ? 1 : 0.8}
        onPress={() => !isDisabled && router.push(`/home/quiz/${item.id}`)}
        disabled={isDisabled}
      >
        <Image
          source={{ uri: item.image_url }}
          style={[styles.cardImage, isDisabled && styles.disabledImage]}
        />
        <Text
          style={[styles.cardTitle, isDisabled && styles.disabledText]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text style={[styles.cardSub, isDisabled && styles.disabledText]}>
          {item.estimatedTime} • {item.reward} coins
        </Text>
        {isDisabled && (
          <View style={styles.disabledOverlay}>
            <Text style={styles.disabledLabel}>Submitted</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1C58F2", "#6495ED", "#FFFFFF"]} // Blue -> Light Blue -> White
        style={styles.container1}
      >
        {/* 🔵 Header Content */}
        <View style={styles.header}>
          <View style={styles.row}>
            <Text style={styles.hello}>Hello </Text>
            <Text style={styles.hello}>{user?.name ?? "User"} 👋</Text>
          </View>
          <Text style={styles.subtitle}>Let’s test your knowledge</Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Image
                source={images.splash}
                style={styles.loginImage}
                resizeMode="cover"
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 2,
              }}
            >
              <SearchBar />
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* ⚪ White Layer */}
      <View style={styles.whiteLayer}>
        <LinearGradient
          colors={["#8eabf5", "#6495ED", "#FFFFFF"]} // Blue -> Light Blue -> White
          style={styles.whiteLayer1}
        >
          <View style={styles.buttonRow}>
            {difficulties.map((level) => (
              <DifficultyButton
                key={level.value}
                label={level.label}
                value={level.value}
              />
            ))}
          </View>

          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.column}
            renderItem={({ item }) => <QuizCard item={item} />}
            showsVerticalScrollIndicator={false}
            refreshing={loading}
          />
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: { paddingBottom: 10 },
  cardImage: {
    width: "100%",
    height: 90,
    borderRadius: 12,
    marginBottom: 8,
  },

  activeLevelButton: {
    backgroundColor: "#1C58F2",
  },

  // activeLevelText: {
  //   color: "#fff",
  // },

  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 50,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  hello: {
    fontSize: 18,
    color: "#fff",
  },

  subtitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
  },

  whiteLayer: {
    flex: 2,
  },
  whiteLayer1: {
    flex: 1,
    borderRadius: 28,
    padding: 20,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  levelButton: {
    backgroundColor: "#EEF2FF",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
  },

  // levelText: {
  //   fontWeight: "600",
  //   color: "#1C58F2",
  // },

  column: {
    justifyContent: "space-between",
  },

  card: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    width: "48%",
  },

  cardTitle: {
    fontWeight: "700",
    fontSize: 16,
  },

  cardSub: {
    color: "#6B7280",
    marginTop: 4,
  },

  disabledCard: {
    opacity: 0.6,
    backgroundColor: "#F3F4F6",
  },

  disabledImage: {
    opacity: 0.5,
  },

  disabledText: {
    color: "#9CA3AF",
  },

  disabledOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.01)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  loginImage: {
    width: 110,
    height: 110,
    marginBottom: 16,
  },

  disabledLabel: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  bubbleContainer: {
    borderRadius: 25,
    backgroundColor: "#EEF2FF",
    // Outer Shadow (The "Lift")
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,

    // Bottom border gives an embossed "edge"
    borderBottomWidth: 3,
    borderBottomColor: "#D1DBF5",
    borderRightWidth: 1,
    borderRightColor: "#D1DBF5",
  },

  activeBubbleContainer: {
    borderBottomWidth: 1, // Flattens slightly when "pressed/active"
    borderBottomColor: "#1648C9",
    shadowColor: "#1C58F2",
    shadowOpacity: 0.4,
  },

  bubbleGradient: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    // Light highlight on top to simulate water/glass reflection
    borderTopWidth: 1.5,
    borderTopColor: "rgba(255, 255, 255, 0.8)",
    borderLeftWidth: 1,
    borderLeftColor: "rgba(255, 255, 255, 0.5)",
  },

  levelText: {
    fontWeight: "700",
    color: "#1C58F2",
    // Subtle text shadow for depth
    textShadowColor: "rgba(255, 255, 255, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },

  activeLevelText: {
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
  },
});
