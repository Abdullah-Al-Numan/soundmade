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

export interface ArtistValidation {
  phoneNumber?: string;
  spotifyLink: string;
  youtubeLink: string;
  facebookLink: string;
  instagramLink: string;
  soundcloudLink: string;
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

export interface PaymentInfoData {
  id: string;
  customerName: string;
  transactionIdentifier: string;
  purchaseDate: string;
  status: string;
  users: {
    fullName: string;
    email: string;
  };
  artists: {
    fullName: string;
    email: string;
  };
}

type GraphQLError = {
  message: string;
};

export type GraphQLResponseError = {
  graphQLErrors: GraphQLError[];
};

export type ProfileEditType = {
  artistinfo: {
    id?: string;
    fullName?: string;
    username?: string;
    email?: string;
    location?: {
      name?: string;
    };
    validation?: ArtistValidation;
    profile?: {
      profilePic?: string;
    };
  };
  onClose: () => void;
};

export interface ArtistInfoProps {
  artist: ArtistData;
}

export interface PostTableProps {
  posts: PostData[];
  artist: ArtistData;
  onDeletePress: (post: PostData) => void;
  setShowCreatePage: (value: boolean) => void;
  refetchPosts: () => void;
}

export interface PostTabsProps {
  showTabsOnly?: boolean;
  onTabChange?: (tab: string) => void;
}

export interface PostData {
  isPaid: boolean;
  user: {
    id: string;
    fullName: string;
  };
  id: string;
  images: string;
  type: string;
  createdAt: string;
  description: string;
  title: string;
}
export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  confirmButtonClass?: string;
  cancelButtonClass?: string;
}
export interface PostTableProps {
  posts: PostData[];
  artist: ArtistData;
  onDeletePress: (post: PostData) => void;
  setShowCreatePage: (value: boolean) => void;
}
export interface VideoType {
  id: string;
  title: string;
  description: string;
  video: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  isPaid: boolean;
  isBlur: boolean;
  userId: string;
}

export interface UserData {
  category: string;
  location: {
    name: string;
  };
  email: string;
  fullName: string;
  id: string;
  profile: {
    profilePic: string;
    fullName: string;
  };
}

export interface ReportUser {
  id: string;
  name: string;
  email: string;
}

export interface ReportData {
  id: string;
  reportedContentId: string;
  reportedContentType: string;
  reportedBy: ReportUser;
  reportedTo: ReportUser;
  reportType: string;
  comment: string;
  status: "pending" | "resolved";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactData {
  id: string;
  reason: string;
  comment: string;
  status: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}
