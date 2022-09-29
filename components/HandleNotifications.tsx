import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

const HandleNotifications = () => {
  const navigation = useNavigation();

  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission required",
          "Local notifications are required in order to be alerted when reminders are due."
        );
        return;
      }
    }

    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("RESPONSE", response);
        const reminderId =
          response.notification.request.content.data.reminderId;
        if (reminderId) {
          // @ts-ignore
          navigation.navigate("ModifyReminder", { reminderId });
        }
      }
    );

    return () => subscription.remove();
  });

  return <React.Fragment />;
};

export default HandleNotifications;
