import { NativeStackScreenProps } from "react-native-screens/native-stack";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  createReminder,
  deleteReminder,
  getReminderDetails,
  updateReminder,
} from "../util/database";
import { Reminder } from "../models/reminder";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { Pressable, StyleSheet, View } from "react-native";
import { ReminderStackParamList } from "../App";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/styles";
import ReminderForm from "../components/Forms/ReminderForm";

const ModifyReminder = ({
  route,
  navigation,
}: NativeStackScreenProps<ReminderStackParamList, "ModifyReminder">) => {
  const reminderId = route.params?.reminderId;
  const isEditing = !!reminderId;

  const [reminder, setReminder] = useState<Reminder>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: reminderId ? "Modify Reminder" : "New Reminder",
    } as any);
  }, [reminderId, navigation]);

  useEffect(() => {
    async function loadReminder() {
      try {
        if (!reminderId) return;
        setIsLoading(true);
        const response = await getReminderDetails(reminderId);
        setReminder(response as Reminder);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setErrorMessage("Unable to fetch reminder.");
      }
    }

    loadReminder();
  }, [reminderId]);

  async function onDelete() {
    if (!reminderId) return;
    setIsLoading(true);
    try {
      await deleteReminder(reminderId);
      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Unable to delete reminder");
    }
  }

  async function onSubmit({
    title,
    description,
    date,
  }: {
    title: string;
    description: string;
    date: Date;
  }) {
    setIsLoading(true);
    try {
      if (isEditing) {
        console.log(title, description, date);
        const updateReminderData = new Reminder(
          reminderId as string,
          title,
          description,
          "reminder",
          false,
          date
        );
        await updateReminder(updateReminderData);
      } else {
        await createReminder({ title, description, date, type: "reminder" });
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
    <View style={styles.container}>
      <ReminderForm
        reminder={reminder}
        onSubmit={onSubmit}
        onCancel={() => navigation.goBack()}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <Pressable onPress={onDelete}>
            <MaterialCommunityIcons
              name="note-plus-outline"
              color={GlobalStyles.colors.error}
              size={24}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ModifyReminder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  deleteContainer: {
    marginTop: 16,
    padding: 8,
    alignItems: "center",
  },
});
