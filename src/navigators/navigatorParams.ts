export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  HomeScreen: undefined;
  VendorProfile: undefined;
  AvailableBids: undefined;
};

export type AppStackParamsList = {
  HomeTabs: undefined;
  AvailableBids: undefined;
  HomeScreen: undefined;
  VendorProfile: undefined;
};
export type DrawerParamList = {
  VendorHome: undefined;
  ChatList: undefined;
  Chat: {userId: string; userName: string; userAvatar: string};
  ChatScreen: {
    userId: string;
    receiverId: string;
    token: string;
    userName?: string;
  };
};
