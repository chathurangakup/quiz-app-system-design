import * as Font from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Rubic-Variable": require("../assets/fonts/Rubik-VariableFont_wght.ttf"),
        "Rubik-Italic-VariableFont_wght": require("../assets/fonts/Rubik-Italic-VariableFont_wght.ttf"),
        "PollerOne-Regular": require("../assets/fonts/PollerOne-Regular.ttf"),
        "Nunito-VariableFont_wght": require("../assets/fonts/Nunito-VariableFont_wght.ttf"),
        "Nunito-Italic-VariableFont_wght": require("../assets/fonts/Nunito-Italic-VariableFont_wght.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // or splash loader
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(public)" />
            <Stack.Screen name="(protected)" />
            <Stack.Screen name="+not-found" />
          </Stack>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
