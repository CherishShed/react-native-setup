export type Profile = {
  username: string;
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  verified: boolean;
};

export type ProductCategory =
  | "Electronics"
  | "Fashion"
  | "Fitness"
  | "HomeKitchen"
  | "Books"
  | "ToysGames"
  | "BeautyPersonalCare"
  | "SportsOutdoors"
  | "Automotive"
  | "ToolsHomeImprovement";

export type ProductType = {
  id: string;
  name: string;
  owner: string;
  price: number;
  purchasing_date: null | string; // Assuming purchasing_date can be null or a string
  images: string[];
  thumbnail: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
};
