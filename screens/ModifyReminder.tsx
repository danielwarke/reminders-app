import { NativeStackScreenProps } from "react-native-screens/native-stack";
import { useEffect, useState } from "react";
import {
  createReminder,
  getReminderDetails,
  updateReminder,
} from "../util/database";
import { Reminder } from "../models/reminder";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { StyleSheet, View, Text } from "react-native";
import { ReminderStackParamList } from "../App";

const ModifyReminder = ({
  route,
  navigation,
}: NativeStackScreenProps<ReminderStackParamList, "ModifyReminder">) => {
  const reminderId = route.params?.reminderId;
  const isEditing = !!reminderId;

  const [reminder, setReminder] = useState<Reminder>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadReminder() {
      try {
        if (!reminderId) return;
        setIsLoading(true);
        const response = await getReminderDetails(reminderId);
        setIsLoading(false);
        setReminder(response as Reminder);
      } catch (error) {
        console.error(error);
        setErrorMessage("Unable to fetch reminder.");
      }
    }

    loadReminder();
  }, [reminderId]);

  async function onSubmit(reminderData: Reminder) {
    setIsLoading(true);
    try {
      if (isEditing) {
        await updateReminder(reminderData);
      } else {
        await createReminder(reminderData);
      }
      navigation.navigate("ReminderList");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setErrorMessage("Unable to save reminder");
    }
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (errorMessage) {
    return <ErrorOverlay message={errorMessage} />;
  }

  return (
    <View>
      <Text>Create new reminder</Text>
    </View>
  );
};

export default ModifyReminder;

const styles = StyleSheet.create({
  reminderContainer: {},
});
