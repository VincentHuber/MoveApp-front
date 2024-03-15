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
      state.value.adress = action.payload.adress;
      state.value.nickname = action.payload.nickname;
      state.value.description = action.payload.description;
      state.value.ambition = action.payload.ambition;
      state.value.coverPicture = action.payload.coverPicture;
      state.value.profilePicture = action.payload.profilePicture;
    },

    logout:(state)=>{
      state.value.token=null
    },

    addProfilePicture: (state, action)=>{
      state.value.profilePicture = action.payload;
    },
    addCoverPicture: (state, action) =>{
      state.value.coverPicture = action.payload;
    },
  
  },
});

export const { login, logout, addProfilePicture, addCoverPicture } = userSlice.actions;
export default userSlice.reducer;
