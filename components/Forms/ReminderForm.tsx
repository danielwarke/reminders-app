import { useState } from "react";
import { Reminder } from "../../models/reminder";
import { getFormattedDate } from "../../util/date";
import { View, StyleSheet, Button, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Input from "./Input";

const ReminderForm = ({
  reminder,
  onSubmit,
  onCancel,
}: {
  reminder?: Reminder;
  onSubmit: (data: { title: string; description: string; date: Date }) => void;
  onCancel: Function;
}) => {
  const [inputs, setInputs] = useState({
    title: {
      value: reminder?.title || "",
      isValid: true,
    },
    description: {
      value: reminder?.description || "",
      isValid: true,
    },
    date: {
      value: reminder ? getFormattedDate(reminder.date) : "",
      isValid: true,
    },
  });

  function inputChangedHandler(
    inputKey: "title" | "description" | "date",
    enteredValue: string
  ) {
    setInputs((currentInputs) => ({
      ...currentInputs,
      [inputKey]: { value: enteredValue, isValid: true },
    }));
  }

  function submitHandler() {
    const reminderData = {
      title: inputs.title.value,
      description: inputs.description.value,
      date: new Date(inputs.date.value),
    };

    const titleIsValid = reminderData.title.trim().length > 0;
    const dateIsValid = reminderData.date.toString() !== "Invalid Date";

    if (!titleIsValid || !dateIsValid) {
      setInputs((currentVal) => ({
        ...currentVal,
        title: { value: currentVal.title.value, isValid: titleIsValid },
        date: { value: currentVal.date.value, isValid: dateIsValid },
      }));
      return;
    }

    onSubmit(reminderData);
  }

  const formIsValid = inputs.title.isValid && inputs.date.isValid;

  return (
    <View style={styles.form}>
      <Input
        label="Title"
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "title"),
          value: inputs.title.value,
        }}
        invalid={!inputs.title.isValid}
      />
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
        invalid={false}
      />
      <Input
        label="Date"
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: inputChangedHandler.bind(this, "date"),
          value: inputs.date.value,
        }}
        invalid={!inputs.date.isValid}
      />
      {!formIsValid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data.
        </Text>
      )}
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Cancel" onPress={() => onCancel()} />
        </View>
        <View style={styles.button}>
          <Button title="Save" onPress={submitHandler}></Button>
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error,
    margin: 8,
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
