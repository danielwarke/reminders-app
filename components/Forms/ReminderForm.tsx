import { useState } from "react";
import { Reminder } from "../../models/reminder";
import { getFormattedDate } from "../../util/date";
import { Button, StyleSheet, View } from "react-native";
import Input from "./Input";

const validate = (title: string, date: string) => {
  return (
    title.trim().length > 0 && new Date(date).toString() !== "Invalid Date"
  );
};

const ReminderForm = ({
  reminder,
  onSubmit,
  onCancel,
}: {
  reminder?: Reminder;
  onSubmit: (data: { title: string; description: string; date: Date }) => void;
  onCancel: Function;
}) => {
  const [title, setTitle] = useState(reminder?.title || "");
  const [description, setDescription] = useState(reminder?.description || "");
  const [date, setDate] = useState(
    reminder ? getFormattedDate(reminder.date) : ""
  );

  return (
    <View style={styles.form}>
      <Input
        label="Title"
        textInputConfig={{
          onChangeText: setTitle,
          value: title,
        }}
      />
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: setDescription,
          value: description,
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: setDate,
          value: date,
        }}
      />
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Cancel" onPress={() => onCancel()} />
        </View>
        <View style={styles.button}>
          <Button
            title="Save"
            onPress={() =>
              onSubmit({ title, description, date: new Date(date) })
            }
            disabled={!validate(title, date)}
          ></Button>
        </View>
      </View>
    </View>
  );
};

export default ReminderForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
