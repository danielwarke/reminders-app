import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ReminderList from "./screens/ReminderList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TodoList from "./screens/TodoList";

const BottomTabs = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <BottomTabs.Navigator>
          <BottomTabs.Screen
            name="ReminderList"
            component={ReminderList}
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
