import { Reminder } from "../../models/reminder";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { deleteReminder, updateReminder } from "../../util/database";
import { GlobalStyles } from "../../constants/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ToDoItem({
  reminder,
  onDelete,
}: {
  reminder: Reminder;
  onDelete: (reminderId: string) => void;
}) {
  const [title, setTitle] = useState(reminder.title);
  const [complete, setComplete] = useState(reminder.complete);

  const updateTitle = useCallback(
    debounce(async (newTitle) => {
      reminder.title = newTitle;
      await updateReminder(reminder);
    }, 500),
    []
  );

  async function toggleTodoComplete() {
    try {
      const newComplete = !complete;
      reminder.complete = newComplete;
      await updateReminder(reminder);
      setComplete(newComplete);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTodo() {
    try {
      await deleteReminder(reminder.id);
      onDelete(reminder.id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View
      style={[styles.reminderContainer, complete && styles.reminderComplete]}
    >
      <Pressable onPress={toggleTodoComplete} style={styles.checkboxContainer}>
        <MaterialCommunityIcons
          name={complete ? "checkbox-marked" : "checkbox-blank-outline"}
          color={GlobalStyles.colors.purple500}
          size={24}
        />
      </Pressable>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="What do you need to do?"
          style={[styles.textInput, complete && styles.textComplete]}
          value={title}
          onChangeText={(value) => {
            setTitle(value);
            updateTitle(value);
          }}
          editable={!complete}
        />
      </View>
      <Pressable onPress={deleteTodo} style={styles.deleteContainer}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          color={GlobalStyles.colors.error}
          size={24}
        />
      </Pressable>
    </View>
  );
}

export default ToDoItem;

const styles = StyleSheet.create({
  reminderContainer: {
    padding: 18,
    flexDirection: "row",
    borderBottomColor: GlobalStyles.colors.gray,
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  reminderComplete: {
    backgroundColor: GlobalStyles.colors.purple50,
  },
  checkboxContainer: {
    flex: 1,
  },
  textInputContainer: {
    flex: 12,
    marginHorizontal: 20,
    padding: 8,
  },
  textInput: {
    fontSize: 16,
    width: "100%",
  },
  textComplete: {
    textDecorationLine: "line-through",
  },
  deleteContainer: {
    flex: 1,
  },
});
