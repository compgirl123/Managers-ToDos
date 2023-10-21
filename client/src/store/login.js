import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from "../App";

export const fetchLogin = createAsyncThunk(
  'login/fetchLogin',
  async (userCredentials) => {
    try {
      // Send a POST request with email and password
      const response = await fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  }
)

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loading: false,
    loginInfo: [],
    error: null
  },
  reducers: {
    login: (state,action) => {
      state.loginInfo = action.payload;
    },
    logout:(state) => {
      state.loginInfo = null;
    }
  },
  extraReducers:(builder) =>{
    builder
    .addCase(fetchLogin.pending,(state)=>{
      state.loading = true;
      state.loginInfo = [];
      state.error = null;
      console.log('pending');
    })
    .addCase(fetchLogin.fulfilled,(state,action)=>{
      console.log(action.payload);
      console.log('fulfilled');
      state.loading = false;
      state.loginInfo = action.payload;
      state.error = null;
    })
    .addCase(fetchLogin.rejected,(state,action)=>{
      console.log('rejected');
      state.loading = false;
      state.loginInfo = null;
      console.log(action.error.message);
      if(action.error.message === 'Request failed with status code 401'){
        state.error = 'Access Denied! Invalid Credentials';
      }
      else{
        state.error = action.error.message;
      }
    })
  }
});

export const { login, logout } = loginSlice.actions;
export const selectLoginUser = (state) => state.loginInfo.loginInfo;
export default loginSlice.reducer;
