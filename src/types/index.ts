export type UserType = {
  id: string;
  email: string;
  fullName: string;
  locationId: string;
  type: string;
  category: string;
  isFirstLogin: boolean;
};

export type SessionType = {
  access_token: string;
  refresh_token: string;
  user: UserType;
};

export type SubMenu = {
  id: string;
  label: string;
  href: string;
  icon: string;
  active: boolean;
  submenu: SubMenu[];
};

export type Menu = {
  id: string;
  label: string;
  href: string;
  icon: string;
  active: boolean;
  submenu: SubMenu[];
};

interface ArtistProfile {
  bio?: string;
  profilePic?: string;
}

interface ArtistLocation {
  name?: string;
}

interface ArtistValidation {
  phoneNumber?: string;
  spotifyLink: string,
  youtubeLink: string,
  facebookLink: string,
  instagramLink: string,
  soundcloudLink: string,
}

export interface ArtistData {
  id: string;
  username?: string;
  fullName?: string;
  email?: string;
  profile?: ArtistProfile;
  location?: ArtistLocation;
  validation?: ArtistValidation;
}
