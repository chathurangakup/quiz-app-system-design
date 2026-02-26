import { createAsyncThunk } from "@reduxjs/toolkit";
import { kycApi } from "../../api/kyc.api";
import { mapCreateKycRequest, mapKycResponse } from "./kyc.mappers";
import { CreateKycRequestDTO } from "./kyc.types";

export const createKycRequestThunk = createAsyncThunk(
  "kyc/createKycRequest",
  async (payload: CreateKycRequestDTO, { rejectWithValue }) => {
    try {
      const response = await kycApi.createKycRequest(
        mapCreateKycRequest(payload),
      );

      return mapKycResponse(response.data.kycRequest);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const getMyKycThunk = createAsyncThunk(
  "kyc/getMyKyc",
  async (_, { rejectWithValue }) => {
    try {
      const response = await kycApi.getMyKyc();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);
