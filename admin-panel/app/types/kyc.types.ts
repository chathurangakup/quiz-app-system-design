export type KycStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface KycRequest {
  id: string;
  user_id: string;
  name: string;
  email: string;
  country: string;
  kyc_status: KycStatus;
  is_active: boolean;
  created_at: string;
}

export interface KycRequest {
  id: string;
  user_id: string;
  user_email: string;

  document_type: string;
  document_number: string;

  document_image_front_url: string;
  document_image_back_url: string;
  selfie_image_url: string;

  address: string;

  status: "PENDING" | "APPROVED" | "REJECTED";

  review_note: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;

  created_at: string;
}
