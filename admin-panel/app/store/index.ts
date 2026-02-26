import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import authReducer from "../store/slices/authSlice";

import kycReducer from "./slices/kycSlice";
import quizzesReducer from "./slices/quizzesSlice";
import submitquizzesReducer from "./slices/submitquizzesSlice";
import usersReducer from "./slices/usersSlice";
// import kycReducer from "./slices/kycSlice";
// import quizReducer from "./slices/quizSlice";
// import userReducer from "./slices/userSlice";
import walletReducer from "./slices/walletSlice";
// import withdrawalReducer from "./slices/withdrawalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    users: usersReducer,
    kyc: kycReducer,
    quizzes: quizzesReducer,
    submitquizzes: submitquizzesReducer,
    // kyc: kycReducer,
    // user: userReducer,
    // quiz: quizReducer,
    wallet: walletReducer,
    // withdrawal: withdrawalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
