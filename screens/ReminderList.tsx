import { FlatList, View, Text } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/native-stack";

const ReminderList = ({
  navigation,
}: NativeStackScreenProps<any, "ReminderList">) => {
  return (
    <View>
      <Text>Reminder List</Text>
      {/*<FlatList data={[]} renderItem={() => <></>} />*/}
    </View>
  );
};

export default ReminderList;
