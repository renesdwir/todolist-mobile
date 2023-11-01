import { Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTodo } from "../context/todo.context";
import { Button } from "../components/Components";
type RootStackParamList = {
  Home: undefined;
  Todo: undefined;
};
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const insets = useSafeAreaInsets();
  const { addUsername } = useTodo();
  const handlePress = () => {
    navigation.navigate("Todo");
  };
  const submitHandler = () => {
    addUsername(username);
    handlePress();
  };
  const onChageHandler = (e: string) => {
    setUsername(e);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      className="justify-center items-center"
    >
      <Text>Welcome to TodoApp</Text>
      <Text>What's Your Name ?</Text>
      <TextInput
        placeholder="username"
        maxLength={8}
        onChangeText={onChageHandler}
        className="border border-gray-300 px-2 py-1 rounded-lg w-32 my-4"
      />

      <Button onPress={submitHandler} text="Submit" classNames="bg-gray-400" />
    </View>
  );
};

export default Home;
