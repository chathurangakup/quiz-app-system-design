import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersService } from "../../services/users.services";
import { UsersResponse, UsersState } from "../../types/users.types";

const initialState: UsersState = {
  users: [],
  count: 0,
  isLoading: false,
  error: null,
};

// GET ALL USERS
export const fetchAllUsers = createAsyncThunk<
  UsersResponse,
  void,
  { rejectValue: string }
>("users/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await usersService.getAllUsers();
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch users",
    );
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.users;
        state.count = action.payload.count;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default usersSlice.reducer;
