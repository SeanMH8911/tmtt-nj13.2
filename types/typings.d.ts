export type Coordinates = {
  lat: number;
  lng: number;
};

export type Venue = {
  id: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  title: string;
  published: Boolean;
  userId: string;
  images: string[];
  user: User;
  fullAddress: string;
  streetName: string;
  locality: string;
  area: string;
  country: string;
  postalCode: string;
  lat: Float;
  lng: Float;
  venueCategory: string;
  openingTime: [];
  bookings: Booking[];
  contactNumber: string;
};
export type OpeningTime = {
  id: string;
  dayOfWeek: int;
  openTime: string;
  closeTime: string;
  midOpenTime: string | null;
  midCloseTime: string | null;
  venueId: string;
  BookableSlots: [];
  artistId: string | null;
  Artist: Artist;
  artistId: String;
  bookings: Booking[];
};
export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: DateTime;
  image: string;
  role: string;
  artist: Artist;
};
export type Artist = {
  id: string;
  stageName: string;
  profileImg: string;
  address: string;
  contactNumber: int;
  facebookLink: string;
  instagramLink: string;
  youtubeLink: string;
  websiteLink: string;
  avaiableForHire: string;
  openingTimes: OpeningTime[];
  user: User;
  userId: string;
  streetName: string;
  locality: string;
  area: string;
  country: string;
  postalCode: string;
  contactEmail: string;
  bookings: Booking[];
  description: string;
};
type Booking = {
  id: string;
  date: dateTime;
  start: string;
  end: string;
  venue: Venue;
  venueId: string;
  venueTitle: string;
  artist: Artist;
  artistId: string;
  openingTime: OpeningTime;
  openingTimeId: string;
};

interface Day {
  day: number;
  timePeriods: {
    openTime: string;
    closingTime: string;
  }[];
}
[];

type Time = {
  day: number;
  timePeriods: {
    openTime: string;
    closingTime: string;
  }[];
  openTime: string;
  closingTime: string;
  midOpenTime: string;
  midCloseTime: string;
  dayOfWeek: number;
  closeTime: string;
  id: string;
};

export declare type Libraries = (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[];
