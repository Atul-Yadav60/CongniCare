import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import Colors from "../constants/Colors";
import { useColorScheme } from "../hooks/useColorScheme";
import { AuthProvider, useAuth } from "../hooks/useAuth";

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
      if (session) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/(auth)/login");
      }
    }
  }, [session, loading]);

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "dark"];

  return (
    <>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: "600",
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modules" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
