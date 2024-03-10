'use client';
import { useGlobalUserName } from '@/common/contexts/GlobalUserNameContext';
import { useWindowCloseHandler } from '@/common/hooks/useWindowCloseHandler';
import { LoginAsAnonymousButton } from '@/components/functional/LoginAsAnonymousButton';
import { useRouter } from 'next/navigation';

export default function Login() {
  useWindowCloseHandler();
  const router = useRouter();
  const [globalUserName, setGlobalUserName] = useGlobalUserName();

  return (
    <div>
      <div>
        {/* お名前入力フォーム */}
        <div>
          <label>お名前:</label>
          <input
            type="text"
            name="userName"
            value={globalUserName}
            onChange={(e) => setGlobalUserName(e.target.value)}
          />
        </div>

        {/* ログインボタン */}
        <div>
          <LoginAsAnonymousButton onClick={() => router.push('/chatroom')}>ログイン</LoginAsAnonymousButton>
        </div>
      </div>
    </div>
  );
}
