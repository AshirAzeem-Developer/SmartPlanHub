import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userType: null,
};

export type UserType = typeof initialState.userType;

// reducer
const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserType(state, action) {
      state.userType = action.payload;
    },
  },
});

export const {setUserType} = user.actions;
export default user.reducer;

export const selectUserType = (state: any) => state.user.userType as UserType;
