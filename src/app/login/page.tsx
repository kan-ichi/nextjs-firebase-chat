'use client';
import { useWindowCloseHandler } from '@/common/hooks/useWindowCloseHandler';
import { LoginAsAnonymousButton } from '@/components/functional/LoginAsAnonymousButton';
import { useRouter } from 'next/navigation';

export default function Login() {
  useWindowCloseHandler();
  const router = useRouter();

  return (
    <div>
      <div>
        <div>ログインしていません。</div>
        <div>
          <LoginAsAnonymousButton onClick={() => router.push('/chatroom')}>Anonymously Login</LoginAsAnonymousButton>
        </div>
      </div>
    </div>
  );
}
