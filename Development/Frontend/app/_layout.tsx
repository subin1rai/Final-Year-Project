import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { LogBox, StatusBar, Text, View, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import AuthService from "@/context/AuthContext"; // Import AuthService

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
LogBox.ignoreLogs(["Clerk:"]);

export default function RootLayout() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [fontsLoaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    Jakarta: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Function to check token status and redirect if necessary
  const checkAuthStatus = async () => {
    console.log("Checking authentication...");
    const isExpired = await AuthService.isTokenExpired();
    console.log("Token expired:", isExpired);

    if (isExpired) {
      await AuthService.removeToken();
      setIsAuthenticated(false);
      router.replace("../(auth)/sign_in"); 
    } else {
      setIsAuthenticated(true);
    }
  };

  // Check authentication status when the app starts
  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (!fontsLoaded || isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="black" translucent={false} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(project)" options={{ headerShown: false }} />
        <Stack.Screen name="(expenses)/budget" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </>
  );
}
