import PrimaryButton from "@/components/common/PrimaryButton";
import { images } from "@/constants/images";
import { router } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function OnboardingScreen() {
  const features = [
    {
      id: 1,
      title: "Complete Tasks",
      description: "Earn rewards by completing simple tasks",
    },
    {
      id: 2,
      title: "Track Earnings",
      description: "Monitor your income in real-time",
    },
    {
      id: 3,
      title: "Secure Payments",
      description: "Get paid securely to your wallet",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={images.searchBot}
          style={styles.illustration}
          resizeMode="contain"
        />

        <Text style={styles.title}>Welcome to TaskEarn</Text>
        <Text style={styles.description}>
          Start earning money by completing simple tasks and challenges
        </Text>

        <View style={styles.featuresContainer}>
          {features.map((feature) => (
            <View key={feature.id} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureNumber}>{feature.id}</Text>
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Get Started"
            onPress={() => router.push("/(public)/register")}
            variant="secondary"
          />
          <PrimaryButton
            title="I have an account"
            variant="outline"
            onPress={() => router.push("/(public)/login")}
            style={{ marginTop: 12 }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    padding: 24,
    alignItems: "center",
  },
  illustration: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 32,
    marginTop: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  featuresContainer: {
    width: "100%",
    marginBottom: 32,
  },
  featureCard: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6366F1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureNumber: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  buttonContainer: {
    width: "100%",
  },
});
