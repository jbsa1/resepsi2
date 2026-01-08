export interface CoupleData {
  name: string;
  fullName: string;
  parents: string;
  photo: string;
  social?: {
    instagram?: string;
  };
}

export interface EventData {
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  mapsLink: string;
}

export interface WeddingData {
  groom: CoupleData;
  bride: CoupleData;
  holyMatrimony: EventData;
  reception: EventData;
  weddingDate: Date;
  story: {
    firstMeeting: string;
    twoBecomeOne: string;
    newJourney: string;
  };
  photos: string[];
  gifts: {
    bankAccounts: {
      bank: string;
      accountNumber: string;
      accountName: string;
    }[];
    digitalWallets: {
      wallet: string;
      accountNumber: string;
      accountName: string;
    }[];
    address: {
      recipientName: string;
      address: string;
    };
  };
}
