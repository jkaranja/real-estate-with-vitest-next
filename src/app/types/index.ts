export interface IListing {
  id: string;
  images: string[];
  bedrooms: string;
  bathrooms: string;
  location: string;
  status: ListingStatus;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
  price: number;
}

export enum ListingStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
}

export enum Category {
  SALE = "SALE",
  RENTAL = "RENTAL",
  LAND = "LAND",
}
