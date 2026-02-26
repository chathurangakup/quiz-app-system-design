import api from "../services/api";
import { CreateKycRequestDTO } from "../store/kyc/kyc.types";

export const kycApi = {
  getMyKyc: () => api.get("/kyc/my-kyc"),

  createKycRequest: (data: CreateKycRequestDTO) => {
    return api.post("/kyc/kyc-requests", data);
  },
};
