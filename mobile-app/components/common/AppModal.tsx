import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PrimaryButton from "./PrimaryButton";

const { width } = Dimensions.get("window");

type AppModalProps = {
  visible: boolean;

  image?: any; // foreground image
  bgImage?: any; // OPTIONAL background image

  title: string;
  description: string;
  buttonText: string;
  onClose: () => void;
  onPress: () => void;
};

export default function AppModal({
  visible,
  image,
  bgImage,
  title,
  description,
  buttonText,
  onClose,
  onPress,
}: AppModalProps) {
  const renderImage = () => {
    // 🔹 Background image + foreground image
    if (bgImage && image) {
      return (
        <ImageBackground
          source={bgImage}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <Image source={image} style={styles.foregroundImage} />
        </ImageBackground>
      );
    }

    // 🔹 Normal image (default behavior)
    if (image) {
      return <Image source={image} style={styles.image} resizeMode="contain" />;
    }

    return null;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Image Section */}
          {renderImage()}

          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Description */}
          <Text style={styles.description}>{description}</Text>

          {/* Button */}
          <PrimaryButton
            title={buttonText}
            onPress={onPress}
            style={styles.button}
            variant="secondary"
          />
          <TouchableOpacity onPress={onClose} style={{ marginTop: 12 }}>
            <Text style={{ color: "#6B7280" }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: width * 0.85,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },

  /* Normal Image */
  image: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },

  /* Background Image */
  imageBackground: {
    width: 165,
    height: 160,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    overflow: "hidden",
  },

  /* Foreground Image */
  foregroundImage: {
    width: 90,
    height: 90,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6366F1",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    width: 200,
  },
});
