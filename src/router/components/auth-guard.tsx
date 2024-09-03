import { useCallback, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';

import { APPOINTMENT } from '@/_mock/assets'; // Ensure APPOINTMENT is the object you need to store
import PageError from '@/pages/sys/error/PageError';
import { useUserToken } from '@/store/userStore';

import { useRouter } from '../hooks';

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const { pathname } = useLocation();
  const { accessToken } = useUserToken();
  console.log(pathname);
  const checkAuth = useCallback(() => {
    if (!accessToken) {
      // Check if the current path is '/dashboard/appointment'
      if (pathname === '/dashboard/appointment') {
        // Store the object in local storage
        localStorage.setItem('redirect', JSON.stringify(APPOINTMENT));
      }
      // Redirect to the login page
      router.replace('/login');
    }
  }, [router, accessToken, pathname]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>;
}
