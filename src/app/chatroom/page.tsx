'use client';
import { useGlobalUserName } from '@/common/contexts/GlobalUserNameContext';
import { useOnChildChatRecordAdded } from '@/common/hooks/useOnChildChatRecordAdded';
import { useWindowCloseHandler } from '@/common/hooks/useWindowCloseHandler';
import { Chat, ChatRecord } from '@/common/types/Chat';
import { DbKeyUtils } from '@/common/utils/DbKeyUtils';
import { FormatDateUtils } from '@/common/utils/FormatDateUtils';
import { AuthGuard } from '@/components/functional/AuthGuard';
import { useAuthContext } from '@/components/functional/AuthProvider';
import { LogoutButton } from '@/components/functional/LogoutButton';
import { FirebaseRealtimeDatabase } from '@/features/FirebaseRealtimeDatabase';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function ChatRoom() {
  useWindowCloseHandler();
  const router = useRouter();
  const { authUser } = useAuthContext();
  const [globalUserName] = useGlobalUserName();
  const [message, setMessage] = useState('');
  const [chatRecords, setChatRecords] = useState<ChatRecord[]>([]);
  useOnChildChatRecordAdded(setChatRecords);

  /**
   * チャットの追加を監視し、最後のメッセージまでスクロールします
   */
  useEffect(() => {
    messagesElementRef.current?.scrollTo({
      top: messagesElementRef.current.scrollHeight,
    });
  }, [chatRecords]);
  const messagesElementRef = useRef<HTMLDivElement | null>(null);

  /**
   * 送信ボタン押下時の処理
   */
  const handleSendButtonClick = async () => {
    if (globalUserName && message) {
      const chat: Chat = {
        userId: authUser?.uid || '',
        userName: globalUserName,
        message: message,
      };
      await FirebaseRealtimeDatabase.addChatToDb(chat);
      setMessage('');
    }
  };

  return (
    <AuthGuard>
      <div className="flex-1 flex flex-col justify-between h-screen px-10 pb-3">
        {/* お名前＆ログアウト */}
        <div className="flex items-center justify-between p-3 bg-slate-100">
          <div className="relative flex items-center space-x-4">
            <span className="inline-block size-10 bg-gray-100 rounded-full overflow-hidden ml-2">
              <svg
                className="size-full text-gray-700"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0.62854" y="0.359985" width="15" height="15" rx="7.5" fill="lightgray" />
                <path
                  d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z"
                  fill="currentColor"
                />
                <path
                  d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="text-2xl text-gray-900">{globalUserName}</span>
          </div>
          <LogoutButton
            className="rounded-md p-2 bg-purple-500 text-white hover:bg-purple-700 focus:outline-none"
            onClick={() => router.push('/login')}
          >
            ログアウト
          </LogoutButton>
        </div>

        {/* メッセージ一覧 */}
        <div className="grow overflow-y-auto bg-indigo-300" ref={messagesElementRef}>
          {chatRecords.map((record) => {
            return (
              <div key={record.id} id={record.id} className="m-4">
                <div className={`flex ${record.userName === globalUserName ? 'justify-end' : 'justify-start'}`}>
                  <div className="flex flex-col items-end mr-3">
                    <label className="text-xs">
                      {FormatDateUtils.mMDD(DbKeyUtils.extractDateFromDbKey(record.id)) +
                        ' ' +
                        FormatDateUtils.hHmm(DbKeyUtils.extractDateFromDbKey(record.id))}
                    </label>
                    <label className="text-xs">{record.userName}</label>
                  </div>
                  <div
                    className={`p-2 max-w-md break-words rounded-t-xl ${
                      record.userName === globalUserName ? 'rounded-l-xl bg-lime-400' : 'rounded-r-xl bg-white'
                    }`}
                  >
                    {record.message}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* メッセージ入力＆送信 */}
        <div className="flex items-center p-3 bg-slate-100">
          <input
            className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="メッセージ入力"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="w-2" />
          <button
            className="inline-flex p-2 rounded-r bg-blue-500 text-white hover:bg-blue-700"
            name="sendButton"
            onClick={handleSendButtonClick}
          >
            <span className="font-bold">送信</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6 ml-2 transform rotate-90"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </div>
    </AuthGuard>
  );
}
