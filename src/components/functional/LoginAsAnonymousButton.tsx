import { FirebaseAuthentication } from '@/features/FirebaseAuthentication';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  onClick?: () => void;
  children?: React.ReactNode;
}

/**
 * 匿名ログインを行うボタン
 */
export const LoginAsAnonymousButton = ({ onClick, children, ...props }: Props) => {
  const handleClick = async () => {
    await FirebaseAuthentication.loginAsAnonymousUser();
    onClick?.();
  };
  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
};
