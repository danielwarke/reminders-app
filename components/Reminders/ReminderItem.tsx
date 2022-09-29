import { Reminder } from "../../models/reminder";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

const ReminderItem = ({ reminder }: { reminder: Reminder }) => {
  return (
    <Pressable style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.reminderContainer}>
        <View>
          <Text style={[styles.textBase, styles.title]}>{reminder.title}</Text>
          <Text style={styles.textBase}>{reminder.description}</Text>
        </View>
        <View>{getFormattedDate(reminder.date)}</View>
      </View>
    </Pressable>
  );
};

export default ReminderItem;

const styles = StyleSheet.create({
  pressed: { opacity: 0.75 },
  reminderContainer: {
    padding: 12,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: GlobalStyles.colors.gray,
    borderBottomWidth: 2,
  },
  textBase: {
    color: GlobalStyles.colors.gray,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  dateContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 120,
  },
});
