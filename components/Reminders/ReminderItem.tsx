import { Reminder } from "../../models/reminder";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

const ReminderItem = ({ reminder }: { reminder: Reminder }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        // @ts-ignore
        navigation.navigate("ModifyReminder", { reminderId: reminder.id });
      }}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.reminderContainer}>
        <View style={styles.textContainer}>
          <Text style={[styles.textBase, styles.title]}>{reminder.title}</Text>
          <Text style={styles.textBase}>{reminder.description}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text>{getFormattedDate(reminder.date)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ReminderItem;

const styles = StyleSheet.create({
  pressed: { opacity: 0.75 },
  reminderContainer: {
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: GlobalStyles.colors.gray,
    borderBottomWidth: 1,
  },
  textContainer: {
    flex: 3,
  },
  textBase: {
    color: GlobalStyles.colors.purple500,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  dateContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
