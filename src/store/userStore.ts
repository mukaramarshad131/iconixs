import { StorageEnum } from '@/types/enums';
import { UserInfo} from '@/types/types';
import { create } from 'zustand';

type UserStore = {
  userInfo: Partial<UserInfo>;
  userToken: string | null;
  userPlan: string | null;
  userPermissions: string[] ;
  intakeForm:any;
  intakeDoc:any;
  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (token: string | null) => void;
    setUserPlan: (planId: string) => void;
    setUserPermissions: (userPermissions: string[]) => void;
    setUserIntakeForm:(intakeForm:any)=>void;
    setUserIntakeDoc:(intakeDoc:any)=>void;
    clearUserInfoAndToken: () => void;
  };
};
export const getItem = <T>(key: StorageEnum, isString?:boolean): T | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  let value = null;
  try {
    const result =  window.localStorage.getItem(key);
    if (result) {
      value =isString?result:JSON.parse(result);
    }
  } catch (error) {
    console.error(error);
  }
  return value;
};
const useUserStore = create<UserStore>((set) => ({
  userInfo: getItem(StorageEnum.User) || {},
  userToken: getItem(StorageEnum.Token) || null,
  userPlan: getItem(StorageEnum.Plan,true) || null,
  userPermissions: getItem(StorageEnum.PERMISSIONS) || [],
  intakeForm: getItem(StorageEnum.INTAKEFORM) || [],
  intakeDoc: getItem(StorageEnum.INTAKEDOC) || [],
  actions: {
    setUserInfo: (userInfo) => {
      set({ userInfo });
      localStorage.setItem('user', JSON.stringify(userInfo));
    },
    setUserToken: (userToken) => {
      set({ userToken });
      localStorage.setItem('token', JSON.stringify(userToken));
      document.cookie = `token=${userToken}; path=/; Secure; SameSite=Strict;`;
    },
    setUserPlan: (userPlan) => {
      set({ userPlan });
      localStorage.setItem('planId', userPlan);
    },
    setUserPermissions: (userPermissions) => {
      set({ userPermissions });
      localStorage.setItem('permissions', JSON.stringify(userPermissions));
      document.cookie = `permissions=${JSON.stringify(userPermissions)}; path=/; Secure; SameSite=Strict;`;
    },
    setUserIntakeForm: (intakeForm) => {
      set({ intakeForm });
      localStorage.setItem('intakeForm', JSON.stringify(intakeForm));
    },
    setUserIntakeDoc: (intakeDoc) => {
      set({ intakeDoc });
      localStorage.setItem('intakeDoc', JSON.stringify(intakeDoc));
    },
    clearUserInfoAndToken() {
      set({ userInfo: {}, userToken: null });
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('permissions');
      localStorage.removeItem('intakeForm');
      localStorage.removeItem('intakeDoc');
      document.cookie = `token=; Max-Age=0; path=/; Secure; SameSite=Strict;`;
      document.cookie = `permissions=; Max-Age=0; path=/; Secure; SameSite=Strict;`;
    },
  },
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserToken = () => useUserStore((state) => state.userToken);
export const useUserPlan = () => useUserStore((state) => state.userPlan);
export const useUserPermissions = () => useUserStore((state) => state.userPermissions);
export const useIntakeForm = () => useUserStore((state) => state.intakeForm);
export const useIntakeDoc = () => useUserStore((state) => state.intakeForm);
export const useUserActions = () => useUserStore((state) => state.actions);

export default useUserStore;
