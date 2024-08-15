import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, updateProfile } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
      avatarURL: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = { ...action.payload };
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, handleRejected)

      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = { ...action.payload };
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.rejected, handleRejected)

      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
        state.user = {
          name: null,
          email: null,
          avatarURL: null,
        };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logOut.rejected, handleRejected)

      .addCase(updateProfile.pending, handlePending)
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = {
          ...state.user,
          ...action.payload,
        };
      })
      .addCase(updateProfile.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;
