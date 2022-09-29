import { NativeStackScreenProps } from "react-native-screens/native-stack";
import { View, Text } from "react-native";

const TodoList = ({ navigation }: NativeStackScreenProps<any, "TodoList">) => {
  return (
    <View>
      <Text>To Do list</Text>
    </View>
  );
};

export default TodoList;
