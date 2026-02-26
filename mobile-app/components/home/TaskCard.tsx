import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Task } from "../../app/store/task/task.slice";

interface TaskCardProps {
  task: Task;
  onPress?: () => void;
  style?: any;
}

export default function TaskCard({ task, onPress, style }: TaskCardProps) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.category}>{task.category}</Text>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                task.status === "completed"
                  ? "#ECFDF5"
                  : task.status === "pending"
                  ? "#FEF3C7"
                  : "#FEF2F2",
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color:
                  task.status === "completed"
                    ? "#065F46"
                    : task.status === "pending"
                    ? "#92400E"
                    : "#991B1B",
              },
            ]}
          >
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </Text>
        </View>
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {task.title}
      </Text>
      <Text style={styles.description} numberOfLines={3}>
        {task.description}
      </Text>

      <View style={styles.footer}>
        <View style={styles.rewardContainer}>
          <Text style={styles.rewardLabel}>Reward:</Text>
          <Text style={styles.rewardAmount}>${task.reward}</Text>
        </View>
        <View style={styles.difficultyContainer}>
          <View
            style={[
              styles.difficultyDot,
              {
                backgroundColor:
                  task.difficulty === "easy"
                    ? "#10B981"
                    : task.difficulty === "medium"
                    ? "#F59E0B"
                    : "#EF4444",
              },
            ]}
          />
          <Text style={styles.difficultyText}>
            {task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    width: 280,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  category: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6366F1",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "500",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rewardContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rewardLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginRight: 4,
  },
  rewardAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#10B981",
  },
  difficultyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  difficultyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  difficultyText: {
    fontSize: 12,
    color: "#6B7280",
  },
});
