import { CreateKycRequestDTO, KycRequestResponse } from "./kyc.types";

// 🔥 Frontend → Backend
export const mapCreateKycRequest = (data: CreateKycRequestDTO) => ({
  document_type: data.document_type,
  document_number: data.document_number,
  document_image_front_url: data.document_image_front_url,
  document_image_back_url: data.document_image_back_url,
  selfie_image_url: data.selfie_image_url,
  status: data.status,
  address: data.address,
  review_note: data.review_note,
});

// 🔥 Backend → Frontend
export const mapKycResponse = (data: KycRequestResponse) => ({
  id: data.id,
  userId: data.user_id,
  documentType: data.document_type,
  documentNumber: data.document_number,
  documentFront: data.document_image_front_url,
  documentBack: data.document_image_back_url,
  selfie: data.selfie_image_url,
  status: data.status.toLowerCase(),
  address: data.address,
  reviewNote: data.review_note,
  createdAt: data.created_at,
});

export const mapIdTypeToDocumentType = (
  idType: "passport" | "driver_license" | "national_id",
): "PASSPORT" | "DRIVING_LICENSE" | "NIC" => {
  switch (idType) {
    case "passport":
      return "PASSPORT";
    case "driver_license":
      return "DRIVING_LICENSE";
    case "national_id":
      return "NIC"; // 🔥 IMPORTANT
    default:
      return "NIC";
  }
};
