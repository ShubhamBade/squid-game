import { StyleSheet, View, Image, ImageBackground } from "react-native";
import React from "react";
import { slickHeight, slickWidth } from "slick-sizer-ui";
import { ButtonComponent } from "../index";

export const LandingScreen = ({navigation}) => {

  const handleOnPress=()=>{
    navigation.navigate("CreateAccountScreen")
  }
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
          <ButtonComponent title="Tap To Play!" width={50} onPress={handleOnPress}/>
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
