import Input from "@/components/common/Input";
import PrimaryButton from "@/components/common/PrimaryButton";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { useState } from "react";
import { Image } from "react-native";

import { images } from "@/constants/images";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { authService } from "../services/auth.service";
import { kycService } from "../services/kyc.service";
import { saveToken } from "../utils/storage";

export default function LoginScreen() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    // Mock login
    try {
      console.log("Logging in:", formData);

      const response = await authService.login({
        email: formData.email,
        password: formData.password,
      });
      console.log("Login response:", response.data);
      const { user, token, message } = response.data;

      console.log("User:", user);
      console.log("Token:", token);
      console.log("Message:", message);
      // 🔐 Securely save token
      await saveToken(token);

      const kyc = await kycService.getMyKyc();
      console.log("My KYC:", kyc);

      // 👉 Navigate based on KYC status
      if (kyc?.status === "COMPLETED") {
        router.replace("/(protected)/(tabs)/home/home");
      } else {
        router.replace("/(protected)/kyc");
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          console.log(error.response.data.message || "Invalid credentials");
        } else {
          console.log("Server error:", error.response.data.message);
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("AXIOS ERROR:", error.message);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={images.loginWrite}
          style={styles.loginImage}
          resizeMode="contain"
        />

        <Text style={styles.loginTitle}>
          Sign in to <Text style={styles.brand}>Quizzie Bot</Text>
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
            style={styles.inputSpacing}
          />
        </View>
        <View style={styles.rememberRow}>
          <Checkbox
            value={rememberMe}
            onValueChange={setRememberMe}
            color={rememberMe ? "#6366F1" : undefined}
          />
          <Text style={styles.rememberText}>Remember me</Text>
        </View>

        <View style={styles.forgotDivider}>
          <View style={styles.dividerLine} />
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password</Text>
          </TouchableOpacity>
          <View style={styles.dividerLine} />
        </View>

        <PrimaryButton
          title="Sign In"
          onPress={handleLogin}
          style={styles.loginButton}
          variant="secondary"
        />

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/(public)/register")}>
            <Text style={styles.registerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={images.google}
              style={styles.socialIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={images.apple}
              style={styles.socialIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={images.facebook}
              style={styles.socialIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 40,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 32,
  },
  form: {
    marginBottom: 16,
  },
  inputSpacing: {
    marginTop: 16,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#6366F1",
    fontWeight: "600",
  },
  loginButton: {
    marginBottom: 24,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
  },
  registerText: {
    color: "#6B7280",
  },
  registerLink: {
    color: "#6366F1",
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    color: "#9CA3AF",
    paddingHorizontal: 16,
  },
  googleButton: {
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  googleButtonText: {
    color: "#374151",
    fontWeight: "600",
  },
  topSection: {
    alignItems: "center",
    marginBottom: 24,
    marginTop: 16,
  },

  loginImage: {
    width: 220,
    height: 160,
    marginBottom: 16,
  },

  loginTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1F2937",
  },

  brand: {
    color: "#6366F1", // PRIMARY COLOR
    fontWeight: "700",
  },

  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  rememberText: {
    marginLeft: 8,
    color: "#374151",
    fontSize: 14,
  },

  forgotDivider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },

  forgotText: {
    color: "#6366F1",
    fontWeight: "600",
    paddingHorizontal: 12,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  socialButton: {
    flex: 1,
    height: 56,
    borderRadius: 12,

    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
  },

  socialIcon: {
    width: 40,
    height: 40,
  },
});
