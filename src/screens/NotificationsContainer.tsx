import * as React from "react";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Button, Platform } from "react-native";
import { notiticationMessageContentType } from "../../types";
import { StoreContext } from "../state/Store";

export interface NotificationsContainerProps {}

// setting handler for notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationsContainer: React.FunctionComponent<NotificationsContainerProps> =
  ({ children }) => {
    // token state
    const { store, dispatch } = React.useContext(StoreContext);
    // const [expoPushToken, setExpoPushToken] = React.useState("");
    const [notification, setNotification] = React.useState();
    const notificationListener = React.useRef();
    const responseListener = React.useRef();

    React.useEffect(() => {
      registerForPushNotificationAsync().then((token) => {
        // setExpoPushToken(token)

        dispatch({
          type: "SET_PUSH_NOTIFICATIONS",
          payload: {
            tokenPush: token,
            pushNotification: sendPushNotificationAsync,
          },
        });
      });

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      responseListener.current = Notifications.addNotificationReceivedListener(
        (response) => {
          console.log(response);
        }
      );

      return () => {
        Notifications.removeNotificationSubscription(notificationListener);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);

    return <>{children}</>;
  };

export async function sendPushNotificationAsync(
  expoPushToken: string,
  notificationMessageContent: notiticationMessageContentType
) {
  const message = {
    to: expoPushToken,
    sound: "default",
    data: { someData: "goes here" },
    ...notificationMessageContent,
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationAsync(): Promise<string> {
  let token = "";

  if (Constants.isDevice) {
    // permisos
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get token for push notifications! :(");
      return "";
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export default NotificationsContainer;
