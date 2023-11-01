import { Pressable, PressableProps, Text } from "react-native";
import React, { FC } from "react";

interface ButtonCompProps extends PressableProps {
  text: string;
  classNames?: string;
}

const Button: FC<ButtonCompProps> = ({ text, classNames, ...props }) => {
  const buttonClasses = [classNames, "px-2 py-2 rounded-md w-20 text-center"]
    .filter(Boolean)
    .join(" ");
  const commonProps = {
    className: buttonClasses,
  };
  return (
    <Pressable {...props} className="flex justify-center items-center">
      <Text className={commonProps.className}>{text}</Text>
    </Pressable>
  );
};

export default Button;
