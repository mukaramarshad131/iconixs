import { useCallback, useEffect } from 'react';

import { APPOINTMENT } from '@/_mock/assets';
import { useRouter } from '@/router/hooks';
import { useUserActions, useUserInfo, useUserToken } from '@/store/userStore';

import { UserInfo } from '#/entity';

function RedirectToAppointment() {
  const { accessToken } = useUserToken();
  const router = useRouter();
  const { setUserInfo } = useUserActions();
  const user = useUserInfo();
  const checkAuth = useCallback(() => {
    if (!accessToken) {
      localStorage.setItem('redirect', JSON.stringify(APPOINTMENT));
      router.replace('/login');
    } else {
      const newUser: UserInfo = {
        ...user,
        permissions: user.permissions!.map((permission: any, index: number) =>
          index === 0
            ? {
                ...permission,
                children: [
                  ...permission.children!,
                  ...(permission.children.some((key: any) => key.label === 'sys.menu.appointment')
                    ? []
                    : [APPOINTMENT]),
                ],
              }
            : permission,
        ),
      } as any;
      setUserInfo(newUser);
      router.replace('/dashboard/appointment');
    }
  }, [router, accessToken, user, setUserInfo]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <div className="flex h-screen w-screen items-center justify-center text-[32px] font-bold italic">
      Please Wait....
    </div>
  );
}

export default RedirectToAppointment;
