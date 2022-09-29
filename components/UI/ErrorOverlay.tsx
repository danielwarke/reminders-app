import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const ErrorOverlay = ({ message }: { message: string }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
    color: GlobalStyles.colors.error,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
