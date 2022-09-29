import { useState } from "react";
import { Reminder } from "../../models/reminder";
import { getFormattedDate } from "../../util/date";
import { Button, Platform, Pressable, StyleSheet, View } from "react-native";
import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";
import RNDateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const validate = (title: string, date: Date) => {
  return title.trim().length > 0 && date.toString() !== "Invalid Date";
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
  const [date, setDate] = useState(reminder?.date || new Date());

  function onDateChange(
    event: DateTimePickerEvent,
    date: Date | undefined,
    openTimePicker?: boolean
  ) {
    if (!date) return;
    setDate(date);

    if (Platform.OS === "android" && openTimePicker) {
      DateTimePickerAndroid.open({
        value: date,
        onChange: onDateChange,
        mode: "time",
      });
    }
  }

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
      {Platform.OS === "ios" && (
        <View style={styles.dateContainer}>
          <RNDateTimePicker
            mode="datetime"
            value={date}
            onChange={onDateChange}
            disabled={complete}
            style={{ width: 230 }}
          />
        </View>
      )}
      {Platform.OS === "android" && (
        <Pressable
          onPress={() => {
            if (complete) return;
            DateTimePickerAndroid.open({
              value: date,
              onChange: (event, date) =>
                onDateChange(event, date, event.type === "set"),
              mode: "date",
            });
          }}
        >
          <Input
            label="Date"
            textInputConfig={{
              value: getFormattedDate(date),
              editable: false,
            }}
          />
        </Pressable>
      )}
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button
            title={complete ? "Close" : "Cancel"}
            onPress={() => onCancel()}
            color={GlobalStyles.colors.purple300}
          />
        </View>
        {!complete && (
          <View style={styles.button}>
            <Button
              title="Save"
              onPress={() => onSubmit({ title, description, date })}
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
  dateContainer: {
    marginVertical: 24,
    width: "100%",
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
