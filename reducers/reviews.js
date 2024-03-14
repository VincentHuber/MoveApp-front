import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: { 
      receiver: null,
      date:null,
      likes:null,
      review:null,
     },
  };

  export const userSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
      login: (state, action) => {
        state.value.receiver = action.payload.receiver;
        state.value.date = action.payload.date;
        state.value.likes = action.payload.likes;
        state.value.review = action.payload.review;
     },
  
      addReview: (state, action)=>{
        state.value.review = action.payload.review;
      },
      
    
    },
  });
  
  export const { addReview } = userSlice.actions;
  export default userSlice.reducer;

  