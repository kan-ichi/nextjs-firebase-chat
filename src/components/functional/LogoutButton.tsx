import { FirebaseAuthentication } from '@/features/FirebaseAuthentication';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  onClick?: () => void;
  children?: React.ReactNode;
}

/**
 * ログアウトを行うボタン（ログアウト＆ユーザー削除を行います）
 */
export const LogoutButton = ({ onClick, children, ...props }: Props) => {
  const handleClick = async () => {
    await FirebaseAuthentication.logoutAndDeleteCurrentUser();
    onClick?.();
  };
  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
};
