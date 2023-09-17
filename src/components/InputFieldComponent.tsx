import React, { useState } from "react";
import { slickHeight, slickWidth, slickFontSize } from "slick-sizer-ui";
import { TextInput } from "react-native-paper";
import { KeyboardTypeOptions } from "react-native";

interface InputFieldComponentInterface {
  backgroundColor?: string;
  label?: string;
  placeHolder?: string;
  maxLength?: number;
  keyboardType?: string;
  value?:any;
}

export const InputFieldComponent: React.FC<
  InputFieldComponentInterface & { onChangeText: (text: string) => void }
> = ({
  backgroundColor = "#404040",
  label = "Name",
  placeHolder = "Enter Your Name",
  maxLength = 256,
  keyboardType = "default",
  value="",
  onChangeText = () => { },
}) => {
  const [text, setText] = useState("");
  return (
    <TextInput
      label={label}
      theme={{ colors: { onSurfaceVariant: "#fff" } }}
      mode="outlined"
      style={{
        backgroundColor: backgroundColor,
        alignSelf: "center",
        width: slickWidth(85),
        fontSize: slickFontSize(4.5),
        textAlign: "left",
        height: slickHeight(9),
        marginTop: slickHeight(2),
      }}
      activeOutlineColor="#fff"
      placeholder={placeHolder}
      placeholderTextColor="#fff"
      outlineColor="#404040"
      textColor="#fff"
      onChangeText={(text) => {
        setText(text);
        onChangeText(text)
      }}
      maxLength={maxLength}
      autoCapitalize="none"
      blurOnSubmit={true}
      keyboardType={keyboardType as KeyboardTypeOptions}
      returnKeyType="done"
      outlineStyle={{ borderRadius: slickWidth(5) }}
      value={text === "" ? value:text}
    />
  );
};
