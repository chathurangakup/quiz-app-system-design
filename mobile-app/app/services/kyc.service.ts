import { kycApi } from "../api/kyc.api";

export const kycService = {
  getMyKyc: async () => {
    const response = await kycApi.getMyKyc();
    return response.data;
  },
  createKycRequest: async (data: any) => {
    const response = await kycApi.createKycRequest(data);
    return response.data;
  },
};
