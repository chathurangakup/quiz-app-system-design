import PrimaryButton from "@/components/common/PrimaryButton";
import { images } from "@/constants/images";
import { router } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { getToken } from "../utils/storage";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* Top content */}
      <View style={styles.content}>
        <Image
          source={images.splashName}
          style={styles.appNameImage}
          resizeMode="contain"
        />

        <ImageBackground
          source={images.elipse}
          style={styles.ellipse}
          resizeMode="contain"
        >
          <Image
            source={images.splash}
            style={styles.splashImage}
            resizeMode="contain"
          />
        </ImageBackground>
      </View>

      {/* Bottom button */}
      <PrimaryButton
        title="START"
        onPress={async () => {
          const token = await getToken();
          console.log("Attaching token to request:", token);
          if (token) {
            router.push("/(protected)/kyc");
          } else {
            router.push("/(public)/login");
          }
        }}
        style={styles.button}
      />
      <Text style={styles.bottomText}>Copyright © 2026 Beyond Logic</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C58F2",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  appNameImage: {
    width: "150%",
    height: 160,
  },
  splashImage: {
    width: "100%",
    height: 280,
  },
  button: {
    marginBottom: 10,
    fontFamily: "Inter-Bold",
  },
  ellipse: {
    width: 380,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomText: {
    color: "white",
    marginTop: 8,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Inter-Regular",
  },
});
