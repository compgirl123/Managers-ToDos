import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loginInfo: [],
  },
  reducers: {},
  extraReducers:(builder) =>{
    builder
    .addCase(fetchLogin.pending,(state)=>{
      console.log('pending');
    })
    .addCase(fetchLogin.fulfilled,(state,action)=>{
      console.log(action.payload);
      console.log('fulfilled');
      state.loginInfo = [...state.loginInfo,action.payload];
    })
    .addCase(fetchLogin.rejected,(state)=>{
      console.log('rejected');
    })
  }
});

//export const { } = todosSlice.actions;
export default loginSlice.reducer;
