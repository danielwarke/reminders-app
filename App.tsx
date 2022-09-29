import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ReminderList from "./screens/ReminderList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TodoList from "./screens/TodoList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModifyReminder from "./screens/ModifyReminder";
import { useCallback, useEffect, useState } from "react";
import { init } from "./util/database";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export type ReminderStackParamList = {
  ReminderList: undefined;
  ModifyReminder: { reminderId: string } | undefined;
};

const Stack = createNativeStackNavigator<ReminderStackParamList>();
const BottomTabs = createBottomTabNavigator();

const RemindersOverview = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReminderList"
        component={ReminderList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="ModifyReminder" component={ModifyReminder} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => setDbInitialized(true))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    async function onInit() {
      await SplashScreen.hideAsync();
    }

    if (dbInitialized) {
      onInit();
    }
  }, [dbInitialized]);

  if (!dbInitialized) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <BottomTabs.Navigator>
          <BottomTabs.Screen
            name="RemindersOverview"
            component={RemindersOverview}
            options={{
              title: "Reminders",
              tabBarLabel: "Reminders",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="reminder"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <BottomTabs.Screen
            name="TodoList"
            component={TodoList}
            options={{
              title: "To Do List",
              tabBarLabel: "To Do",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="format-list-checks"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </BottomTabs.Navigator>
      </NavigationContainer>
    </>
  );
}
