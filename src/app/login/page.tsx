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
    <div className="flex h-screen flex-col items-center justify-center bg-slate-200">
      <div className="flex w-96 flex-col items-center rounded bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-semibold">ログインページ</h2>

        {/* お名前入力フォーム */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            お名前
          </label>
          <input
            className="mt-1 w-full rounded-md border p-2"
            type="text"
            name="userName"
            value={globalUserName}
            onChange={(e) => setGlobalUserName(e.target.value)}
          />
        </div>

        {/* ログインボタン */}
        <div>
          <LoginAsAnonymousButton
            className="w-full rounded-md bg-blue-500 p-2 text-white"
            onClick={() => router.push('/chatroom')}
          >
            ログイン
          </LoginAsAnonymousButton>
        </div>
      </div>
    </div>
  );
}
