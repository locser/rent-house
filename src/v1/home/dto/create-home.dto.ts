export class CreateHomeDto {
  title: string;
  description: string;
  address: string;
  price: number;
  monthly_rent: number;
  bedrooms: number;
  bathrooms: number;
  status: boolean;
  image_url?: string;
  // owner_id: number;
}
