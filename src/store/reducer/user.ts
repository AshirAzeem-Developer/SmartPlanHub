import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userType: null,
  isLoggedIn: false,
};

export type UserType = typeof initialState.userType;

// reducer21
const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserType(state, action) {
      state.userType = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {setUserType} = user.actions;
export const {setIsLoggedIn} = user.actions;
export default user.reducer;

export const selectUserType = (state: any) => state.user.userType as UserType;
export const selectIsLoggedIn = (state: any) =>
  state.user.isLoggedIn as boolean;
