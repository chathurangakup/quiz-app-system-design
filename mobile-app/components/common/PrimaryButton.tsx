import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../app/theme/colors";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  loading?: boolean;
  disabled?: boolean;
  style?: any;
}

export default function PrimaryButton({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  style,
}: PrimaryButtonProps) {
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary && styles.primaryButton,
        isSecondary && styles.secondaryButton,
        variant === "outline" && styles.outlineButton,
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator
          color={
            isPrimary || isSecondary ? colors.text.inverse : colors.text.primary
          }
        />
      ) : (
        <Text
          style={[
            styles.buttonText,
            isPrimary && styles.primaryText,
            isSecondary && styles.secondaryText,
            variant === "outline" && styles.outlineText,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Primary = White Button (Splash Screen style) */
  primaryButton: {
    backgroundColor: colors.background.light,
  },

  /* Outline Variant */
  outlineButton: {
    backgroundColor: colors.background.light,
    borderWidth: 2,
    borderColor: colors.text.primary,
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  primaryText: {
    color: colors.text.primary,
  },

  outlineText: {
    color: colors.text.primary,
  },
  /* 🔵 Secondary = Filled Brand Button */
  secondaryButton: {
    backgroundColor: colors.text.primary, // #1C58F2
  },

  secondaryText: {
    color: colors.text.inverse, // white
  },
});
