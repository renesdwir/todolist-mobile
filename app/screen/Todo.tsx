import { Keyboard, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useTodo } from "../context/todo.context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DraggableFlatList from "react-native-draggable-flatlist";
import { Button, TodoList } from "../components/Components";

const SeparatorComponent = () => {
  return <View style={{ height: 10 }} />;
};
const TodoScreen = () => {
  const [todo, setTodo] = useState("");
  const insets = useSafeAreaInsets();
  const {
    username,
    length: lengthTodo,
    done,
    todos,
    toggleTodo,
    removeTodo,
    addTodo,
    setOnDrag,
  } = useTodo();
  const lengthTodos = lengthTodo();
  const doneTodo = done();

  const submitHandler = () => {
    if (todo !== "") {
      addTodo(todo);
      setTodo("");
      Keyboard.dismiss();
    }
  };
  const onChageHandler = (e: string) => {
    setTodo(e);
  };
  return (
    <View
      style={{
        flex: 1,
        // Paddings to handle safe area
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      className="bg-white"
    >
      <View className="px-4 pt-4 mb-2 bg-blue-400 flex pb-5 rounded-b-[35px]">
        <Text className="text-2xl font-bold text-white">
          Hello {username || "User"} 👋
        </Text>
        <Text className="text-white font-bold">What are you going to do?</Text>
        <View className="flex flex-row my-5">
          <TextInput
            onChangeText={onChageHandler}
            value={todo}
            placeholder="add to-do"
            className="flex-1 bg-white border-none rounded-l-md py-2 px-2"
          />
          <Button
            text="+"
            className="bg-black  rounded-r-md "
            classNames="text-white font-bold text-2xl"
            onPress={submitHandler}
          />
        </View>
        <View className="flex flex-row  justify-between">
          <Text className="text-white">Your To-Do List:</Text>
          <Text className="text-white">
            Done : {doneTodo}/{lengthTodos}
          </Text>
        </View>
      </View>

      {lengthTodos > 0 ? (
        <DraggableFlatList
          data={todos}
          onDragEnd={({ data }) => setOnDrag(data)}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={SeparatorComponent}
          renderItem={({ item, drag, getIndex, isActive }) =>
            TodoList({ item, toggleTodo, removeTodo, drag, getIndex, isActive })
          }
        />
      ) : (
        <View className="mt-3">
          <Text className="text-center text-gray-600">You don't have anything todo!</Text>
        </View>
      )}
    </View>
  );
};

export default TodoScreen;
