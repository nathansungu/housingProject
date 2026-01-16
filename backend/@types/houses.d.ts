export type CreateHouse = {
  name: string;
  roomType: string;
  roomsNumber: number;
  vacantUnits: number;
  location: string;
  description: string;
  pricing: number;
  waterBill: boolean;
  electricBill: boolean;
  wifi: boolean;
  rentDeadline: string;
  status: string;
  landlordId: string;
};

export type UpdateHouse = {
  id: string;
  landlordId: string;
  name?: string;
  roomType?: string;
  roomsNumber?: number;
  vacantUnits?: number;
  location?: string;
  description?: string;
  pricing?: number;
  waterBill?: boolean;
  electricBill?: boolean;
  wifi?: boolean;
};

export type CreateHousePictures = {
  houseId: string;
  imgUrl: string[];
};

export type addReviewType = {
  rating: number;
  comment: string;
  userId: string;
  houseId: string;
};

export type UpdateReviewType = {
  id: string;
  isDeleted?: boolean ;
  houseId: string;
  rating?: number;
  comment?: string;
  userId: string;
};
