import { FlatList, View, Text } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/native-stack";
import { useEffect, useState } from "react";
import { Reminder } from "../models/reminder";
import { useIsFocused } from "@react-navigation/native";
import { getReminders } from "../util/database";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import ReminderItem from "../components/Reminders/ReminderItem";

const ReminderList = ({
  navigation,
}: NativeStackScreenProps<any, "ReminderList">) => {
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
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setErrorMessage("Unable to fetch reminders");
      }
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

  return (
    <View>
      <Text>Reminders</Text>
      <FlatList
        data={reminders}
        renderItem={(itemData) => <ReminderItem reminder={itemData.item} />}
      />
    </View>
  );
};

export default ReminderList;
