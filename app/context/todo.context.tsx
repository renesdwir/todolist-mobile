import { ReactNode, createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { Todo } from "../types/todo.types";

interface TodoContextType {
  todos: Todo[];
  length: () => number;
  done: () => number;
  username: string;
  addUsername: (name: string) => void;
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  setOnDrag: (todo: Todo[]) => void;
}
const defaultTodos: Todo[] = [
  {
    id: "1221221",
    title: "Technical Test",
    isDone: true,
  },
  {
    id: "121121",
    title: "Press 1s & Drag Me Please",
    isDone: false,
  },
];
const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}
const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState(defaultTodos);
  const [username, setUsername] = useState("");
  const addUsername = (name: string) => {
    setUsername(name);
  };
  const setOnDrag = (todo: Todo[]) => {
    setTodos(todo);
  };
  const addTodo = (title: string) => {
    setTodos([...todos, { id: uuid(), isDone: false, title }]);
  };
  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
    );
  };
  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  const length = () => todos.length;
  const done = () => todos.filter((todo) => todo.isDone === true).length;

  const value = {
    todos,
    addTodo,
    toggleTodo,
    addUsername,
    username,
    done,
    length,
    removeTodo,
    setOnDrag,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
function useTodo(): TodoContextType {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within an TodoProvider");
  }
  return context;
}

export { TodoProvider, useTodo };
