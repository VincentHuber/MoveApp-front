import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { 
    token: null,
    nickname:null,
    adress:null,
    description:null,
    ambition:null,
    coverPicture: null,
    profilePicture: null,
    sports:[],
   },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.nickname = action.payload.username;
      state.value.description = action.payload.description;
      state.value.coverPicture = action.payload.coverPicture;
      state.value.ambition = action.payload.ambition;
      state.value.profilePicture = action.payload.profilePicture;
      state.value.sports.push(action.payload.sports)
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
