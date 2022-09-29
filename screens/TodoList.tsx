import { NativeStackScreenProps } from "react-native-screens/native-stack";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { Reminder } from "../models/reminder";
import { createReminder, getReminders } from "../util/database";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import ToDoItem from "../components/ToDo/ToDoItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TodoList = ({ navigation }: NativeStackScreenProps<any, "TodoList">) => {
  const isFocused = useIsFocused();

  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }: { tintColor: any }) => (
        <Pressable
          onPress={async () => {
            try {
              const createdId = await createReminder({
                title: "",
                description: "",
                type: "todo",
                date: new Date(),
              });
              setReminders((currentVal) => [
                new Reminder(
                  createdId as string,
                  "",
                  "",
                  "todo",
                  false,
                  new Date()
                ),
                ...currentVal,
              ]);
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <MaterialCommunityIcons
            name="plus-box-outline"
            color={tintColor}
            size={22}
          />
        </Pressable>
      ),
    } as any);
  }, [navigation]);

  useEffect(() => {
    async function loadReminders() {
      try {
        setIsLoading(true);
        const response = await getReminders("todo");
        setReminders(response as Reminder[]);
      } catch (error) {
        console.error(error);
        setErrorMessage("Unable to fetch to do list");
      }
      setIsLoading(false);
    }

    if (isFocused) {
      loadReminders();
    }
  }, [isFocused]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (errorMessage) {
    return <ErrorOverlay message={errorMessage} />;
  }

  if (reminders.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateText}>
          No to do items have been created
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reminders}
        renderItem={(itemData) => (
          <ToDoItem
            reminder={itemData.item}
            onDelete={(reminderId) => {
              setReminders((currentVal) =>
                currentVal.filter((reminder) => reminder.id !== reminderId)
              );
            }}
          />
        )}
      />
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 18,
  },
});
