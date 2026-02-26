import { images } from "@/constants/images";
import { Image, StyleSheet, Text, View } from "react-native";

interface BalanceCardProps {
  totalBalance: number;
  todayEarnings: number;
  availableToWithdraw: number;
}

export default function BalanceCard({
  totalBalance,
  todayEarnings,
  availableToWithdraw,
}: BalanceCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* LEFT SIDE */}
        <View style={styles.balanceContainer}>
          <Text style={styles.label}>Total Balance</Text>
          <Text style={styles.balance}>
            ${Number(totalBalance ?? 0).toFixed(2)}
          </Text>
        </View>

        {/* RIGHT SIDE */}
        <Image
          source={images.botlookphone}
          style={styles.botImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Today's Earnings</Text>
          <Text style={styles.statValue}>+${todayEarnings.toFixed(2)}</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Available to Cashout</Text>
          <Text style={styles.statValue}>
            ${availableToWithdraw.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0db8e8",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statItem: {
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginHorizontal: 16,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  balanceContainer: {
    flex: 1,
  },

  label: {
    fontSize: 14,
    color: "#111827",
  },

  balance: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 4,
  },

  botImage: {
    width: 80,
    height: 80,
    marginLeft: 10,
    flex: 2,
  },
});
