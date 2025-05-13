export interface IntroConfig {
  durationMs: number;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export interface AccountInfo {
  groomAccounts: BankAccount[];
  brideAccounts: BankAccount[];
}

export interface WeddingInfo {
  brideFullName: string;
  groomFullName: string;
  groomFirstName: string;
  brideFirstName: string;
  brideFatherName: string;
  brideMotherName: string;
  groomFatherName: string;
  groomMotherName: string;
  date: Date;
  location: string;
  address: string;
  mapUrl?: string;
}

export interface WeddingData {
  introConfig: IntroConfig;
  weddingInfo: WeddingInfo;
  galleryImages: GalleryImage[];
  accountInfo: AccountInfo;
} 