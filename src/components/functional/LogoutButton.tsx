import { FirebaseAuthentication } from '@/features/FirebaseAuthentication';
import { FirebaseRealtimeDatabase } from '@/features/FirebaseRealtimeDatabase';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  onClick?: () => void;
  children?: React.ReactNode;
}

/**
 * ログアウトを行うボタン（古いチャットデータを削除し、ログアウト＆ユーザー削除を行います）
 */
export const LogoutButton = ({ onClick, children, ...props }: Props) => {
  const handleClick = async () => {
    await FirebaseRealtimeDatabase.deleteOldChatRecordsFromDb();
    await FirebaseAuthentication.logoutAndDeleteCurrentUser();
    onClick?.();
  };
  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
};
