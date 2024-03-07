import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { 
    token: null,
    email: null,
    nickname:null,
    email:null,
    adress:null,
    description:null,
    ambition:null,
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
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.nickname = action.payload.nickname;
      state.value.description = action.payload.description;
      state.value.ambition = action.payload.ambition;
      state.value.sports = action.payload.sports;
    },

    addProfilePicture: (state, action)=>{
      state.value.profilePicture = action.payload.profilePicture;
    },
    addCoverPicture: (state, action) =>{
      state.value.coverPicture = action.payload.coverPicture;
    },
  
  },
});

export const { login, addProfilePicture, addCoverPicture } = userSlice.actions;
export default userSlice.reducer;
