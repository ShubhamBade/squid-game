import { StyleSheet, View, Image, ImageBackground } from "react-native";
import React from "react";
import { slickHeight, slickWidth } from "slick-sizer-ui";
import { ButtonComponent } from "../index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { saveUserData } from "../redux_toolkit/features/userSlice";

export const LandingScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleOnPress = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      const userParseData = JSON.parse(userData);
      console.log("Aync data :", userParseData);
      if (userParseData) {
        dispatch(saveUserData(userParseData));
        if (userParseData.mobileNumber === "") {
          navigation.navigate("CreateAccountScreen");
        } else {
          navigation.navigate("GreenLightRedLightScreen");
        }
      } else {
        navigation.navigate("CreateAccountScreen");
      }
    } catch (error) {
      navigation.navigate("CreateAccountScreen");
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/landingBackground.png")}
        style={styles.bg}
      >
        <View style={{ height: slickHeight(20), alignSelf: "center" }}>
          <Image
            source={require("../assets/images/SquidGameLogo1.png")}
            style={styles.logo}
          />
        </View>

        <View style={{ height: slickHeight(50) }}>
          <Image
            source={require("../assets/images/SquidGameMask.png")}
            style={styles.maskFace}
          />
        </View>

        <View
          style={{
            height: slickHeight(30),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ButtonComponent
            title="Tap To Play!"
            width={50}
            onPress={handleOnPress}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
  bg: {
    flex: 1,
  },
  logo: {
    height: slickHeight(16),
    width: slickWidth(50),
  },
  maskFace: {
    marginTop: slickHeight(8),
    alignSelf: "center",
    height: slickHeight(40),
    width: slickWidth(60),
  },
});
