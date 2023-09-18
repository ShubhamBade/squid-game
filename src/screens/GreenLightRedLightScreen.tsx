import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { slickHeight, slickWidth, slickFontSize } from "slick-sizer-ui";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/Entypo";
import Timer from "react-native-vector-icons/MaterialCommunityIcons";
import { ButtonComponent } from "../components/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { saveUserData } from "../redux_toolkit/features/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GreenLightRedLightScreen = ({ navigation }) => {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timerCount, setTimerCount] = useState(0);
  const [numberOfValidHits, setNumberOfValidHits] = useState(0);
  const [boxColor, setBoxColor] = useState("#fff");

  const levels = ["LEVEL EASY", "LEVEL MEDIUM", "LEVEL HARD"];
  const levelMapHit = {
    "LEVEL EASY": 10,
    "LEVEL MEDIUM": 15,
    "LEVEL HARD": 20,
  };

  const startGameFunction = () => {
    setStartGame(true);
    setTimerCount(40);
  };

  useEffect(() => {
    let intervalId: any;
    if (startGame && timerCount === 0) {
      setGameOver(true);
      setBoxColor("#fff");
    }
    if (startGame && timerCount > 0) {
      intervalId = setInterval(() => {
        setTimerCount((prevCount) => prevCount - 1);
      }, 1000);
    } else if (timerCount === 0) {
      clearInterval(intervalId);
      setStartGame(false);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [startGame, timerCount]);

  useEffect(() => {
    if (startGame) {
      const colorInterval = setInterval(() => {
        setBoxColor((prevColor) => (prevColor === "red" ? "green" : "red"));
      }, 1000);
      return () => {
        clearInterval(colorInterval);
      };
    }
  }, [startGame]);

  useEffect(() => {
    if (gameOver) {
      navigation.navigate("ResultScreen", { result: "LOOSE" });
    }
  }, [gameOver]);

  const checkValidClick = async(color: string) => {
    if (color === "red") {
      dispatch(
        saveUserData({
          ...user,
          previousRecords: [
            ...user.previousRecords,
            {
              result: "LOOSE",
              score: numberOfValidHits,
              level: user.difficultyLevel,
            },
          ],
        })
      );
      setTimerCount(0);
      setNumberOfValidHits(0);
      navigation.navigate("ResultScreen", { result: "LOOSE" });
    } else if (color === "green") {
      setNumberOfValidHits((prevHits) => prevHits + 1);
      if (
        user.difficultyLevel &&
        levelMapHit[user.difficultyLevel] === numberOfValidHits + 1
      ) {
        dispatch(
          saveUserData({
            ...user,
            previousRecords: [
              ...user.previousRecords,
              {
                result: "WIN",
                score: numberOfValidHits,
                level: user.difficultyLevel,
              },
            ],
          })
        );
        setTimerCount(0);
        setNumberOfValidHits(0);
        navigation.navigate("ResultScreen", { result: "WIN" });
      }
    }
  };
  useEffect(() => {
    async function saveLocalData() {
      try {
        await AsyncStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Error while saving user data in async:", error);
      }
    }
    saveLocalData();
  }, [user]);

  return (
    <ImageBackground
      source={require("../assets/images/GameBackground.png")}
      style={{
        flex: 1,
      }}
    >
      <View style={style.container}>
        <View style={style.headerContainer}>
          <Image
            source={require("../assets/images/SquidGameLogo2.png")}
            style={{
              resizeMode: "contain",
            }}
          />
          <Pressable
            onPress={() => {
              navigation.navigate("LeadershipBoardScreen");
            }}
          >
            <Image
              source={require("../assets/images/ProfileIcon.png")}
              style={style.profileIconStyle}
            />
          </Pressable>
        </View>
        <SelectDropdown
          data={levels}
          disabled={startGame}
          defaultButtonText={user.difficultyLevel}
          buttonStyle={{
            backgroundColor: "#404040",
            borderRadius: slickWidth(10),
            height: slickHeight(8),
            width: slickWidth(70),
            marginTop: slickHeight(5),
            borderColor: "#fff",
            borderWidth: slickWidth(1),
          }}
          buttonTextStyle={{
            color: "#fff",
            fontSize: slickFontSize(4.5),
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
        <Text style={style.textStyle}>
          Tap on Green Color to score a candy.
        </Text>

        <Pressable
          style={[style.colorBox, { backgroundColor: boxColor }]}
          onPress={() => checkValidClick(boxColor)}
        />

        <View style={style.scoreContainer}>
          {startGame ? (
            <>
              <Image
                source={require("../assets/images/cookieIcon.png")}
                style={style.cookieStyle}
              />
              <Text style={style.scoreTextStyle}> +{numberOfValidHits}</Text>
            </>
          ) : (
            <Text style={style.textStyle}>
              You need {levelMapHit[user.difficultyLevel]} candy🍭 to win🤑 this
              level
            </Text>
          )}
        </View>
        <View style={{ marginTop: slickHeight(8) }}>
          {startGame ? (
            <View style={style.timerContainer}>
              <Timer name="timer" size={slickHeight(5)} color="#E5E5E5" />
              <Text style={style.timerLeftTextStyle}> {timerCount} Sec</Text>
            </View>
          ) : (
            <ButtonComponent title="Start Game" onPress={startGameFunction} />
          )}
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
    width: slickWidth(100),
    alignItems: "center",
  },
  profileIconStyle: {
    height: slickHeight(8),
    width: slickHeight(8),
    borderRadius: slickHeight(4),
    borderColor: "#fff",
    borderWidth: slickWidth(1),
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: slickHeight(3),
    height: slickHeight(10),
    width: slickWidth(90),
  },
  textStyle: {
    fontSize: slickFontSize(4.5),
    marginTop: slickHeight(2),
    color: "#fff",
  },
  colorBox: {
    height: slickHeight(20),
    width: slickHeight(20),
    marginTop: slickHeight(13),
    borderRadius: slickHeight(3),
    backgroundColor: "#fff",
  },
  cookieStyle: {
    height: slickHeight(8),
    width: slickHeight(8),
    resizeMode: "contain",
  },
  scoreContainer: {
    flexDirection: "row",
    marginTop: slickHeight(5),
    alignItems: "center",
  },
  scoreTextStyle: {
    fontSize: slickFontSize(10),
    color: "#fff",
    fontWeight: "bold",
  },
  timerLeftTextStyle: {
    fontSize: slickFontSize(5),
    color: "#fff",
    fontWeight: "bold",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: slickHeight(-2),
  },
});
