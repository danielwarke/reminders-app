import { FlatList, StyleSheet, View, Text } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/native-stack";
import { useEffect, useState } from "react";
import { Reminder } from "../models/reminder";
import { useIsFocused } from "@react-navigation/native";
import { getReminders } from "../util/database";
import LoadingOverlay from "../components/UI/LoadingOverlay";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadReminders() {
      try {
        setIsLoading(true);
        const response = await getReminders("reminder");
        setReminders(response as Reminder[]);
      } catch (error) {
        console.error(error);
        setErrorMessage("Unable to fetch reminders");
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
