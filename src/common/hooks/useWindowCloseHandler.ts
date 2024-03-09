import { useAuthContext } from '@/components/functional/AuthProvider';
import { FirebaseAuthentication } from '@/features/FirebaseAuthentication';
import { useEffect } from 'react';

/**
 * ウィンドウを閉じる時の処理（ログイン状態の場合は、ログアウト＆ユーザー削除を行います）
 */
export const useWindowCloseHandler = () => {
  const authContext = useAuthContext();

  useEffect(() => {
    const handleBeforeunload = async (event: { preventDefault: () => void; returnValue: string }) => {
      // ログイン状態の場合は、ログアウト＆ユーザー削除
      if (authContext.authUser) {
        event.preventDefault();
        event.returnValue = '';
        await FirebaseAuthentication.logoutAndDeleteCurrentUser();
      }
    };
    window.addEventListener('beforeunload', handleBeforeunload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
    };
  }, [authContext]);
};
