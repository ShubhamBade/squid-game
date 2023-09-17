import React from "react";
import { Button } from "react-native-paper";
import { slickHeight, slickWidth, slickFontSize } from "slick-sizer-ui";

interface ButtonComponentInterface {
  title?: string;
  buttonColor?: string;
  height?: number;
  width?: number;
  fontSize?: number;
  color?: string;
}

export const ButtonComponent: React.FC<
  ButtonComponentInterface & { onPress?: () => void }
> = ({
  title = "Register",
  buttonColor = "#D9D9D9",
  height = 8,
  width = 85,
  fontSize = 5,
  color = "#5C0B2C",
  onPress = () => {},
}) => {
  return (
    <Button
      mode="contained"
      style={{
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: slickWidth(10),
        height: slickHeight(height),
        width: slickWidth(width),
        borderColor: "#fff",
        borderWidth: slickWidth(0),
        backgroundColor: buttonColor,
      }}
      labelStyle={{
        fontSize: slickFontSize(fontSize),
        textAlignVertical: "center",
        color: color,
      }}
      contentStyle={{ alignSelf: "center" }}
      onPress={onPress}
    >
      {title}
    </Button>
  );
};
