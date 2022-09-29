import { useState } from "react";
import { Reminder } from "../../models/reminder";
import { getFormattedDate } from "../../util/date";
import { Button, StyleSheet, View } from "react-native";
import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";

const validate = (title: string, date: string) => {
  return (
    title.trim().length > 0 && new Date(date).toString() !== "Invalid Date"
  );
};

const ReminderForm = ({
  reminder,
  onSubmit,
  onComplete,
  onCancel,
  complete,
}: {
  reminder?: Reminder;
  onSubmit: (data: { title: string; description: string; date: Date }) => void;
  onComplete: Function;
  onCancel: Function;
  complete?: boolean;
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
          editable: !complete,
        }}
      />
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: setDescription,
          value: description,
          editable: !complete,
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: setDate,
          value: date,
          editable: !complete,
        }}
      />
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button
            title="Cancel"
            onPress={() => onCancel()}
            color={GlobalStyles.colors.purple300}
          />
        </View>
        {!complete && (
          <View style={styles.button}>
            <Button
              title="Save"
              onPress={() =>
                onSubmit({ title, description, date: new Date(date) })
              }
              disabled={!validate(title, date)}
              color={GlobalStyles.colors.purple300}
            ></Button>
          </View>
        )}
      </View>
      {reminder && !complete && (
        <View style={styles.completeButtonContainer}>
          <View style={styles.completeButton}>
            <Button
              title="Mark as Done"
              onPress={() => onComplete()}
              color={GlobalStyles.colors.purple300}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default ReminderForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
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
    marginTop: 16,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  completeButtonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  completeButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});
