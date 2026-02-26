import { RootState } from "@/app/store/rootReducer";
import { removeToken } from "@/app/utils/storage";
import { images } from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
// import { useAppDispatch } from "@/app/store/hooks";

import { fetchProfile } from "@/app/store/auth.slice";
import { useCallback } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileScreen() {
  // const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<any>();
  const menuItems = [
    { icon: "person", label: "Edit Profile", color: "#6366F1" },
    { icon: "shield-checkmark", label: "Privacy & Security", color: "#10B981" },
    { icon: "card", label: "Payment Methods", color: "#F59E0B" },
    { icon: "help-circle", label: "Help & Support", color: "#8B5CF6" },
    { icon: "document-text", label: "Terms & Conditions", color: "#EC4899" },
    { icon: "settings", label: "Settings", color: "#6B7280" },
  ];

  const { user, wallet, quizStats } = useSelector(
    (state: RootState) => state.auth,
  );

  console.log("User in Profile:", user);
  const profile = user;

  const statsData = quizStats;
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchProfile());
    }, []),
  );

  const stats = [
    {
      label: "Submitted Quizzes",
      value: statsData?.submitted_quizzes || 0,
    },
    {
      label: "Total Earnings",
      value: `$${wallet?.total_earnings || 0}`,
    },
    {
      label: "Active Days",
      value: statsData?.active_days || 0,
    },
    {
      label: "Rating",
      value: statsData?.rating || 0,
    },
  ];

  const handleLogout = () => {
    removeToken();
    router.replace("/(public)/login");
  };

  const isVerified = profile?.kyc_status === "APPROVED";

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={["#1C58F2", "#6495ED", "#FFFFFF"]} // Blue -> Light Blue -> White
        style={styles.container1}
      >
        <View style={styles.content}>
          <View style={styles.content}>
            <View style={styles.profileHeader}>
              <Image source={images.profile} style={styles.profileImage} />

              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>
                  {profile?.name || "John Doe"}
                </Text>

                <Text style={styles.profileEmail}>
                  {profile?.email || "john.doe@example.com"}
                </Text>

                {/* 🔥 KYC STATUS */}
                <View style={styles.verificationBadge}>
                  <Ionicons
                    name={isVerified ? "checkmark-circle" : "time-outline"}
                    size={16}
                    color={isVerified ? "#10B981" : "#F59E0B"}
                  />

                  <Text
                    style={[
                      styles.verificationText,
                      {
                        color: isVerified ? "#10B981" : "#F59E0B",
                      },
                    ]}
                  >
                    {isVerified ? "Verified" : "Pending"}
                  </Text>
                </View>
              </View>
            </View>

            {/* 🔥 REAL STATS */}
            <View style={styles.statsGrid}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statItem}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>

            <View style={styles.menuSection}>
              <Text style={styles.sectionTitle}>Account</Text>
              {menuItems.map((item, index) => (
                <TouchableOpacity key={index} style={styles.menuItem}>
                  <View
                    style={[
                      styles.menuIcon,
                      { backgroundColor: `${item.color}15` },
                    ]}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={24}
                      color={item.color}
                    />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out" size={24} color="#EF4444" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C58F2",
    paddingTop: 40,
  },
  content: {
    padding: 16,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 8,
  },
  verificationBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  verificationText: {
    marginLeft: 4,
    color: "#10B981",
    fontWeight: "500",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statItem: {
    width: "48%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  container1: {},
  menuSection: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  logoutText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
  },
  version: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 14,
  },
});
