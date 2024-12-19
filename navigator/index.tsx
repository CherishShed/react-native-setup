import React, { useEffect } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import { useSelector } from "react-redux";
import { getAuthState, updateAuthState } from "../store/AuthStore";
import { useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth";
import TabNavigator from "./TabNavigator";

const Navigator = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
      primary: "skyblue",
    },
  };
  const { loggedIn, profile } = useSelector(getAuthState);
  const { GetLoggedInUser } = useAuth();

  const dispatch = useDispatch();
  console.log(loggedIn, profile);
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await GetLoggedInUser();
      if (data) {
        dispatch(updateAuthState({ loggedIn: true, profile: data.user }));
      } else {
        if (error) {
          dispatch(updateAuthState({ loggedIn: false, profile: null }));
        }
      }
    };
    getUser();
  }, []);
  return (
    <NavigationContainer theme={MyTheme}>
      {!loggedIn ? <AuthNavigator /> : <TabNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;
