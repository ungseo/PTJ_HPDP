export interface ProfilePhotoInterFace {
  styles?: { [key: string]: string };
}

export interface EditInputInterface {
  name?: string;
  email?: string;
  phoneNumber?: string;
}

export interface FundingHistoryInterface {
  companyId: number;
  name: string;
  fundingId: number;
  thumbnail?: string;
  hashtag?: string;
  title: string;
  targetAmount?: number;
  startDate: string;
  endDate: string;
  dDay?: string;
  totalFunding: number;
  state?: string;
}
[];
