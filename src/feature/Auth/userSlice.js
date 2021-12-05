import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";


export const register = createAsyncThunk(
  'user/register',
  async (payload) => {
    const data = await userApi.register(payload)
    //   localStorage.setItem('access_token',data.jwt)
    localStorage.setItem('user', JSON.stringify(data))
    return data
  }
);
export const loginUser = createAsyncThunk(
  'user/login',
  async (payload) => {
    const data = await userApi.login(payload)
    localStorage.setItem('access_token', JSON.stringify(data.access))
    return data
  }
);
export const currrentUser = createAsyncThunk(
  'user/login',
  async (payload) => {
    const data = await userApi.getCurrent(payload)
    localStorage.setItem('user',JSON.stringify(data))
    return data
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem('user')) || {},
    settings: {},
  },
  reducers: {
    logout(state){
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      state.current = {}
    }
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      // payload : kết quả trả ra của hàm register(data.user)
      state.current = action.payload
    },
    [loginUser.fulfilled]: (state, action) => {
      state.current = action.payload
    },
    [currrentUser.fulfilled]: (state, action) => {
      state.current = action.payload
    },
    // sau khi action đc dispath sẽ cập nhật lại state
  },
});

const {actions, reducer } = userSlice
export const {logout} = actions
export default reducer