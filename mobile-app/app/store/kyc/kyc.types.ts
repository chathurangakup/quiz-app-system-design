// 🔥 Request Body (POST API)
export interface CreateKycRequestDTO {
  document_type: "PASSPORT" | "DRIVING_LICENSE" | "NIC";
  document_number: string;
  document_image_front_url: string;
  document_image_back_url: string;
  selfie_image_url: string;
  status: "PENDING";
  address: string;
  review_note?: string;
}

// 🔥 API Response Model
export interface KycRequestResponse {
  id: string;
  user_id: string;
  document_type: string;
  document_number: string;
  document_image_front_url: string;
  document_image_back_url: string;
  selfie_image_url: string;
  status: "PENDING" | "VERIFIED" | "REJECTED";
  address: string;
  review_note?: string;
  created_at: string;
}
