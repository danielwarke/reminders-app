import { FlatList, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/native-stack";
import { useEffect, useState } from "react";
import { Reminder } from "../models/reminder";
import { useIsFocused } from "@react-navigation/native";
import { getReminders } from "../util/database";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import ReminderItem from "../components/Reminders/ReminderItem";
import { ReminderStackParamList } from "../App";

const ReminderList = ({}: NativeStackScreenProps<
  ReminderStackParamList,
  "ReminderList"
>) => {
  const isFocused = useIsFocused();

  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadReminders() {
      try {
        const response = await getReminders("reminder");
        setReminders(response as Reminder[]);
      } catch (error) {
        console.error(error);
        setErrorMessage("Unable to fetch reminders");
      }
    }

    if (isFocused) {
      loadReminders();
    }
  }, [isFocused]);

  if (errorMessage) {
    return <ErrorOverlay message={errorMessage} />;
  }

  if (reminders.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateText}>No reminders have been set</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reminders}
        renderItem={(itemData) => <ReminderItem reminder={itemData.item} />}
      />
    </View>
  );
};

export default ReminderList;

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
