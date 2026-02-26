import { StyleSheet, Text, View } from "react-native";

interface StatusBadgeProps {
  status: "pending" | "verified" | "rejected";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    pending: { color: "#F59E0B", backgroundColor: "#FEF3C7", label: "Pending" },
    verified: {
      color: "#10B981",
      backgroundColor: "#ECFDF5",
      label: "Verified",
    },
    rejected: {
      color: "#EF4444",
      backgroundColor: "#FEE2E2",
      label: "Rejected",
    },
  };

  const config = statusConfig[status];

  return (
    <View style={[styles.badge, { backgroundColor: config.backgroundColor }]}>
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});
