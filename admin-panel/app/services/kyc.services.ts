import { KycRequest } from "../types/kyc.types";
import api from "./api";

// export interface KycRequest {
//   name: ReactNode;
//   kyc_status: string;
//   id: string;
//   user_id: string;
//   full_name: string;
//   nic_number: string;
//   status: "PENDING" | "APPROVED" | "REJECTED";
//   created_at: string;
// }

export interface ReviewKycPayload {
  status: "APPROVED" | "REJECTED";
  reviewed_by: string;
  review_note: string;
}

export const kycService = {
  getAllKycRequests: async (): Promise<KycRequest[]> => {
    const response = await api.get("/kyc/admin/kyc-requests");
    return response.data;
  },

  reviewKycRequest: async (
    kycId: string,
    payload: ReviewKycPayload,
  ): Promise<KycRequest> => {
    const response = await api.put(
      `/kyc/admin/kyc-requests/${kycId}/review`,
      payload,
    );
    return response.data;
  },
};
