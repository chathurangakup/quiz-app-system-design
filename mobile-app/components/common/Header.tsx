import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react"; // Added useEffect and useRef
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../../app/theme/colors";

interface HeaderProps {
  progress?: number;
  onBack: () => void;
  hideProgress?: boolean;
  title?: string;
  avatarUrl?: string;
}

export default function Header({
  progress = 0, // Default to 0
  onBack,
  hideProgress,
  title,
  avatarUrl,
}: HeaderProps) {
  // 1. Initialize the animated value
  const animatedProgress = useRef(new Animated.Value(progress)).current;

  // 2. Animate when the progress prop changes
  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 1000, // Speed of the animation in ms
      useNativeDriver: false, // Width doesn't support native driver
    }).start();
  }, [progress]);

  // 3. Interpolate the value to a percentage string
  const widthInterpolation = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Pressable onPress={onBack} hitSlop={10}>
          <Ionicons name="arrow-back" size={24} color={colors.text.inverse} />
        </Pressable>
        {title && <Text style={styles.title}>{title}</Text>}
      </View>

      {!hideProgress && (
        <View style={styles.progressWrapper}>
          <View style={styles.progressBackground}>
            {/* 4. Use Animated.View instead of View */}
            <Animated.View
              style={[styles.progressFill, { width: widthInterpolation }]}
            />
          </View>
        </View>
      )}

      {avatarUrl ? (
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarFallback}>
          <Ionicons name="person" size={18} color={colors.gray[600]} />
        </View>
      )}
    </View>
  );
}

// ... styles remain the same

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  title: {
    fontSize: 25,
    fontWeight: "600",
    color: colors.background.light,
  },

  progressWrapper: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },

  progressBackground: {
    width: "100%",
    height: 12,
    backgroundColor: colors.gray[200],
    borderRadius: 6,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: colors.text.primary,
    borderRadius: 6,
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: "auto",
  },

  avatarFallback: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gray[200],
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
  },
});
