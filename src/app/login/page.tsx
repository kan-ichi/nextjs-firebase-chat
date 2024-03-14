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
        <h1 className="mb-4 text-2xl font-semibold">ログインページ</h1>
        <p className="mb-4 max-w-full text-center text-xs">ユーザー登録せずに使えます。お気軽にお試しください</p>

        {/* お名前入力フォーム */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            お名前
            <input
              className="mt-1 w-full rounded-md border p-2"
              type="text"
              placeholder="入力してください"
              value={globalUserName}
              onChange={(e) => setGlobalUserName(e.target.value)}
            />
          </label>
        </div>

        {/* ログインボタン */}
        <div>
          <LoginAsAnonymousButton
            className={`w-full rounded-md p-2 text-white ${
              globalUserName.trim() === '' ? 'cursor-not-allowed bg-gray-300' : 'bg-blue-500'
            }`}
            onClick={() => router.push('/chatroom')}
            disabled={globalUserName.trim() === ''}
          >
            ログイン
          </LoginAsAnonymousButton>
        </div>

        <ul className="ml-1 mt-4 text-left text-xs text-gray-600">
          <li>チャットメッセージは、10日後に削除されます</li>
          <li>チャット画面でメッセージを個別に削除する事も可能です</li>
        </ul>
      </div>
    </div>
  );
}
