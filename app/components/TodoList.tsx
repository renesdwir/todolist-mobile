import { Pressable, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Todo } from "../types/todo.types";
import { RenderItemParams, ScaleDecorator } from "react-native-draggable-flatlist";

type CombinedType = RenderItemParams<Todo> & {
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
};
const TodoList = ({ item, removeTodo, toggleTodo, drag, isActive }: CombinedType) => {
  return (
    <ScaleDecorator>
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={drag}
        disabled={isActive}
        style={[{ backgroundColor: isActive ? "transparent" : "transparent" }]}
        className=" px-3"
      >
        <View className="bg-gray-300 flex flex-row justify-between items-center px-3 py-2 rounded-md">
          <Pressable onPress={() => toggleTodo(item.id)}>
            {item.isDone ? (
              <Text className="text-3xl ">&#9745;</Text>
            ) : (
              <Text className="text-3xl ">&#9744;</Text>
            )}
          </Pressable>
          <Text className="flex-1 pl-3 ">{item.title}</Text>
          <Pressable onPress={() => removeTodo(item.id)}>
            <Text className="text-xl ">&#x2715;</Text>
          </Pressable>
        </View>
      </TouchableOpacity>
    </ScaleDecorator>
  );
};

export default TodoList;
