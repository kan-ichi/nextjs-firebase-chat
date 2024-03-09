'use client';
import { useWindowCloseHandler } from '@/common/hooks/useWindowCloseHandler';
import { AuthGuard } from '@/components/functional/AuthGuard';
import { useAuthContext } from '@/components/functional/AuthProvider';
import { LogoutButton } from '@/components/functional/LogoutButton';

import { useRouter } from 'next/navigation';

export default function ChatRoom() {
  useWindowCloseHandler();
  const router = useRouter();
  const { authUser } = useAuthContext();

  return (
    <AuthGuard>
      <h1>Chat Room</h1>
      <div>{authUser?.uid}</div>
      <div>ログイン中です。</div>
      <div>
        <LogoutButton onClick={() => router.push('/login')}>Logout</LogoutButton>
      </div>
    </AuthGuard>
  );
}
