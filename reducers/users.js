import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { 
    token: null,
    email: null,
    nickname: null,
    adress: null,
    description: null,
    ambition: null,
    coverPicture: null,
    profilePicture: null,
    sports: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, email, nickname, adress, description, ambition, coverPicture, profilePicture, sports } = action.payload;
      state.value = { token, email, nickname, adress, description, ambition, coverPicture, profilePicture, sports };
    },

    logout: (state) => {
      state.value.token = null
    },

    addProfilePicture: (state, action) => {
      state.value.profilePicture = action.payload;
    },
    addCoverPicture: (state, action) => {
      state.value.coverPicture = action.payload;
    },
  },
});

export const { login, logout, addProfilePicture, addCoverPicture } = userSlice.actions;
export default userSlice.reducer;
