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
      state.value.ambition = action.payload.ambition;
      state.value.sports.push(action.payload.sports)
    },

    addProfilePicture: (state, action)=>{
      state.value.profilePicture = action.payload.coverPicture;
    },
    addCoverPicture: (state, action) =>{
      state.value.coverPicture = action.payload.coverPicture;
    },
  
  },
});

export const { login, addProfilePicture, addCoverPicture } = userSlice.actions;
export default userSlice.reducer;
