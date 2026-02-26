import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { getToken } from "../utils/storage";

export default function ProtectedLayout() {
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken(); // ✅ await token

      if (!token) {
        router.replace("/(public)/login");
      }

      setCheckingAuth(false);
    };

    checkAuth();
  }, []);

  // ⛔ Block rendering until auth check completes
  if (checkingAuth) {
    return null; // or loader
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
