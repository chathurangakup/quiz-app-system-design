import { RootState } from "@/app/store/rootReducer";
import {
  fetchWallet,
  fetchWalletTransactions,
} from "@/app/store/wallet/wallet.thunk";
import BalanceCard from "@/components/wallet/BalanceCard";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const WalletScreen = () => {
  const dispatch = useDispatch<any>();

  const { wallet, transactions, loading } = useSelector(
    (state: RootState) => state.wallet,
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchWallet());
      dispatch(fetchWalletTransactions());
    }, []),
  );
  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading wallet...</Text>
      </View>
    );
  }

  // if (!wallet) {
  //   return (
  //     <View style={styles.center}>
  //       <Text>No wallet data</Text>
  //     </View>
  //   );
  // }

  const quickActions = [
    { id: 1, icon: "arrow-up-circle", title: "Withdraw", color: "#10B981" },
    { id: 2, icon: "add-circle", title: "Deposit", color: "#6366F1" },
    { id: 3, icon: "repeat", title: "Transfer", color: "#F59E0B" },
    { id: 4, icon: "receipt", title: "History", color: "#EF4444" },
  ];

  const safeWallet = {
    totalEarnings: wallet?.totalEarnings ?? 0,
    todayEarnings: wallet?.todayEarnings ?? 0,
    availableToWithdraw: wallet?.availableToWithdraw ?? 0,
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={["#1C58F2", "#6495ED", "#FFFFFF"]} // Blue -> Light Blue -> White
        style={styles.container1}
      >
        <Text style={styles.sectionMainTitle}>Wallet</Text>
        <View style={styles.content}>
          <BalanceCard
            totalBalance={safeWallet.totalEarnings}
            todayEarnings={safeWallet.todayEarnings}
            availableToWithdraw={safeWallet.availableToWithdraw}
          />

          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.actionButton}>
                <View
                  style={[
                    styles.actionIcon,
                    { backgroundColor: `${action.color}15` },
                  ]}
                >
                  <Ionicons
                    name={action.icon as any}
                    size={24}
                    color={action.color}
                  />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.transactionsList}>
            {transactions.length === 0 ? (
              <View style={styles.center}>
                <Text>No transactions yet</Text>
              </View>
            ) : (
              <FlatList
                data={transactions.slice(0, 5)}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => {
                  const isCredit = item.type === "QUIZ_REWARD";

                  return (
                    <View style={styles.transactionItem}>
                      <View style={styles.transactionInfo}>
                        <View
                          style={[
                            styles.transactionIcon,
                            {
                              backgroundColor: isCredit ? "#ECFDF5" : "#FEF2F2",
                            },
                          ]}
                        >
                          <Ionicons
                            name={isCredit ? "arrow-down" : "arrow-up"}
                            size={20}
                            color={isCredit ? "#10B981" : "#EF4444"}
                          />
                        </View>

                        <View>
                          <Text style={styles.transactionTitle}>
                            Quiz Reward
                          </Text>
                          <Text style={styles.transactionDate}>
                            {new Date(item.createdAt).toLocaleDateString()}
                          </Text>
                        </View>
                      </View>

                      <Text
                        style={[
                          styles.transactionAmount,
                          { color: isCredit ? "#10B981" : "#EF4444" },
                        ]}
                      >
                        +${item.amount.toFixed(2)}
                      </Text>
                    </View>
                  );
                }}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: "#F3F4F6",
                      marginVertical: 8,
                    }}
                  />
                )}
              />
            )}
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C58F2",
    paddingTop: 40,
  },
  container1: { paddingBottom: 10 },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginTop: 24,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  sectionMainTitle: {
    fontSize: 25,
    fontWeight: "600",
    color: "white",
    marginTop: 24,
    marginBottom: 16,
    paddingLeft: 30,
  },
  seeAll: {
    color: "#6366F1",
    fontWeight: "600",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
  },
  actionButton: {
    alignItems: "center",
    flex: 1,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    color: "#4B5563",
  },
  transactionsList: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 204,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  transactionInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
  },
  transactionDate: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WalletScreen;
