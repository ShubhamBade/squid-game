import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { slickHeight, slickWidth, slickFontSize } from "slick-sizer-ui";
import { InputFieldComponent, ButtonComponent } from "../index";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import { saveUserData } from "../redux_toolkit/features/userSlice";

export const CreateAccountScreen = ({ navigation }) => {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  const [error, setError] = useState(false);
  const [errorData, setErrorData] = useState({
    nameError: false,
    nameErrorMessage: "*please enter your name",
    phoneError: false,
    phoneErrorMessgae: "*please enter your phone",
    levelError: false,
    levelErrorMessage: "*choose game level",
    emailError: false,
    emailErrorMessage: "*please enter your email",
  });

  useEffect(() => {
    if (error) {
      const updatedErrorData = {
        nameError: user.name === "",
        phoneError: user.mobileNumber === "" || user.mobileNumber.length === 0,
        levelError: user.difficultyLevel === "",
        emailError: user.email === "",
      };
      setErrorData({ ...errorData, ...updatedErrorData });
    }
  }, [error, user]);

  const levels = ["LEVEL EASY", "LEVEL MEDIUM", " LEVEL HARD"];

  const handleOnPress = () => {
    if (
      user.name === "" ||
      user.mobileNumber === "" ||
      user.difficultyLevel === ""
    ) {
      setError(true);
    } else {
      setTimeout(() => {
        navigation.navigate("GreenLightRedLightScreen");
      }, 1000);
    }
  };
  return (
    <ImageBackground
      source={require("../assets/images/registerbackground.png")}
      style={{
        flex: 1,
      }}
    >
      <View style={style.container}>
        <Text style={style.headingStyle}>Create Account</Text>
        <Text style={style.subHeadingStyle}>to get start playing!</Text>
        <View style={{ marginTop: slickHeight(3) }}>
          <InputFieldComponent
            value={user.name}
            onChangeText={(name) => {
              dispatch(
                saveUserData({
                  ...user,
                  name,
                })
              );
            }}
          />
          {errorData.nameError ? (
            <Text style={style.errorStyle}>{errorData.nameErrorMessage}</Text>
          ) : null}
          <InputFieldComponent
            label="Phone No."
            placeHolder="Enter Your Phone"
            maxLength={10}
            value={user.mobileNumber}
            keyboardType="numeric"
            onChangeText={(mobileNumber) => {
              dispatch(
                saveUserData({
                  ...user,
                  mobileNumber,
                })
              );
            }}
          />
          {errorData.phoneError ? (
            <Text style={style.errorStyle}>{errorData.phoneErrorMessgae}</Text>
          ) : null}
          <InputFieldComponent
            label="Email"
            value={user.email}
            placeHolder="Enter Your Email"
            onChangeText={(email) => {
              dispatch(
                saveUserData({
                  ...user,
                  email,
                })
              );
            }}
          />
          {errorData.emailError ? (
            <Text style={style.errorStyle}>{errorData.emailErrorMessage}</Text>
          ) : null}
          <SelectDropdown
            data={levels}
            defaultButtonText="Game Level"
            defaultValue={user.difficultyLevel}
            buttonStyle={{
              backgroundColor: "#404040",
              borderRadius: slickWidth(5),
              height: slickHeight(9),
              width: slickWidth(85),
              marginTop: slickHeight(3),
            }}
            buttonTextStyle={{
              color: "#fff",
              fontSize: slickFontSize(4.5),
              marginLeft: slickWidth(-40),
            }}
            dropdownStyle={{
              backgroundColor: "#404040",
              borderRadius: slickWidth(5),
            }}
            rowTextStyle={{
              color: "#fff",
              fontSize: slickFontSize(4.5),
            }}
            renderDropdownIcon={DropDownIconComponent}
            onSelect={(selectedItem, index) => {
              dispatch(
                saveUserData({
                  ...user,
                  difficultyLevel: selectedItem,
                })
              );
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
          {errorData.levelError ? (
            <Text style={style.errorStyle}>{errorData.levelErrorMessage}</Text>
          ) : null}
        </View>
        <View style={{ marginTop: slickHeight(10) }}>
          <ButtonComponent onPress={handleOnPress} />
        </View>
      </View>
    </ImageBackground>
  );
};

const DropDownIconComponent = () => {
  return <Icon name="triangle-down" size={slickWidth(8)} color="#E5E5E5" />;
};

const style = StyleSheet.create({
  container: {
    height: slickHeight(100),
    justifyContent: "center",
    alignItems: "center",
  },
  headingStyle: {
    fontSize: slickFontSize(7),
    color: "#FFF",
    fontWeight: "bold",
  },
  subHeadingStyle: {
    fontSize: slickFontSize(5),
    color: "#FFF",
  },
  errorStyle: {
    color: "#FFCCCB",
  },
});
