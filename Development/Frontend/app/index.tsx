import { Redirect } from "expo-router";
import { SafeAreaView, StatusBar, Text } from "react-native";

const index = () => {
  return <Redirect href="/(auth)/welcome" />
};

export default index;
