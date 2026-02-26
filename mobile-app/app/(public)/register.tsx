import AppModal from "@/components/common/AppModal";
import CountryDropdown from "@/components/common/CountryDropdown";
import Header from "@/components/common/Header";
import Input from "@/components/common/Input";
import PrimaryButton from "@/components/common/PrimaryButton";
import { images } from "@/constants/images";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { authService } from "../services/auth.service";
import { countries } from "../utils/constants";

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [country, setCountry] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const requiredFields = [
    formData.fullName,
    formData.email,
    formData.phone,
    country,
    formData.password,
    formData.confirmPassword,
  ];

  // count filled fields
  const filledCount = requiredFields.filter(
    (field) => field && field.toString().trim().length > 0,
  ).length;

  // progress value between 0 - 1
  const progress =
    requiredFields.length > 0
      ? Math.min(1, Math.max(0, filledCount / requiredFields.length))
      : 0;

  // button enable condition

  const handleRegister = async () => {
    try {
      setLoading(true);

      const payload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: country!,
        password: formData.password,
      };

      const response = await authService.register(payload);
      console.log("Register Response:", response);
      if (response.message) {
        console.log("Registration successful:", response);
        setShowSuccessModal(true);
        // ✅ Show success modal instead of navigating immediately
        setTimeout(() => {
          setShowSuccessModal(true);
        }, 150); // small delay for iOS safety
      }
    } catch (error: any) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const isPasswordMatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  const isFormComplete =
    filledCount === requiredFields.length && isPasswordMatch;

  return (
    <ScrollView style={styles.container}>
      <AppModal
        visible={showSuccessModal}
        image={images.success} // optional
        bgImage={images.bgsuccess} // optional
        title="Registration Successful 🎉"
        description="Your account has been created successfully. Please sign in to continue."
        buttonText="Go to Login"
        onClose={() => setShowSuccessModal(false)}
        onPress={() => {
          setShowSuccessModal(false);
          router.replace("/(public)/login");
        }}
      />

      <Header
        progress={progress}
        onBack={() => router.back()}
        hideProgress={false}
      />
      <View style={styles.content}>
        <Text style={styles.title}>
          Create an <Text style={styles.titlePrimary}>account</Text>
        </Text>
        <Text style={styles.description}>
          Please enter your username, date of birth and country. If you forget
          it, then you have to do forgot password.
        </Text>

        <View style={styles.form}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChangeText={(text) =>
              setFormData({ ...formData, fullName: text })
            }
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />

          <Input
            label="Phone Number"
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
          />

          <View style={styles.field}>
            <Text style={styles.inputLabel}>Country</Text>
            <CountryDropdown
              value={country}
              countries={countries}
              onSelect={setCountry}
            />
          </View>

          <Input
            label="Password"
            placeholder="Create a password"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
          />

          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) =>
              setFormData({ ...formData, confirmPassword: text })
            }
          />
        </View>

        <PrimaryButton
          title="SIGN UP"
          onPress={handleRegister}
          style={styles.registerButton}
          disabled={!isFormComplete}
          variant="secondary"
        />

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/(public)/login")}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.terms}>
          By creating an account, you agree to our Terms of Service and Privacy
          Policy
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
  },

  content: {
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
    textAlign: "center",
  },

  titlePrimary: {
    color: "#1C58F2", // primary color
  },

  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 12,
  },

  description: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 28,
    lineHeight: 20,
    textAlign: "center",
  },

  form: {
    marginBottom: 24,
  },

  field: { marginBottom: 16 },

  inputLabel: {
    marginBottom: 8,
    color: "#374151",
    fontWeight: "600",
  },

  registerButton: {
    marginBottom: 24,
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },

  loginText: {
    color: "#6B7280",
  },

  loginLink: {
    color: "#6366F1",
    fontWeight: "600",
  },

  terms: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 16,
  },
});
