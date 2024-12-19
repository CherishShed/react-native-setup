import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../types/types";
import { RootStore } from ".";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  profile: Profile | null;
  loggedIn: boolean;
}
const initialState: AuthState = {
  profile: null,
  loggedIn: false,
};

const AuthSlice = createSlice({
  name: "AuthStore",
  initialState,
  reducers: {
    updateAuthState: (state, { payload }: PayloadAction<AuthState>) => {
      state.loggedIn = payload.loggedIn;
      state.profile = payload.profile;
    },
  },
});

export const { updateAuthState } = AuthSlice.actions;
export const getAuthState = createSelector(
  (state: RootStore) => state,
  (authState) => authState.auth
);
const AuthReducer = AuthSlice.reducer;
export default AuthReducer;
