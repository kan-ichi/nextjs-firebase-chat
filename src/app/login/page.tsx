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
    <div className="bg-slate-200 h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-96 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-6">ログインページ</h2>

        {/* お名前入力フォーム */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600 text-sm font-medium">
            お名前
          </label>
          <input
            className="mt-1 p-2 w-full border rounded-md"
            type="text"
            name="userName"
            value={globalUserName}
            onChange={(e) => setGlobalUserName(e.target.value)}
          />
        </div>

        {/* ログインボタン */}
        <div>
          <LoginAsAnonymousButton
            className="bg-blue-500 text-white p-2 rounded-md w-full"
            onClick={() => router.push('/chatroom')}
          >
            ログイン
          </LoginAsAnonymousButton>
        </div>
      </div>
    </div>
  );
}
