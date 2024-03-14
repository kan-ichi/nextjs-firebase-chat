'use client';
import { useGlobalUserName } from '@/common/contexts/GlobalUserNameContext';
import { useOnChildChatRecordAdded } from '@/common/hooks/useOnChildChatRecordAdded';
import { useOnChildChatRecordRemoved } from '@/common/hooks/useOnChildChatRecordRemoved';
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
  useOnChildChatRecordRemoved(setChatRecords);

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

  /**
   * 削除ボタン押下時の処理
   */
  const handleDeleteButtonClick = async (id: string) => {
    await FirebaseRealtimeDatabase.deleteChatRecordFromDb(id);
  };

  return (
    <AuthGuard>
      <div className="flex h-screen flex-1 flex-col justify-between px-0 sm:px-10">
        {/* お名前＆ログアウト */}
        <div className="flex items-center justify-between bg-slate-100 p-3">
          <div className="relative flex items-center space-x-4">
            <span className="ml-2 inline-block size-10 overflow-hidden rounded-full bg-gray-100">
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
            className="rounded-md bg-purple-500 p-2 text-white hover:bg-purple-700 focus:outline-none"
            onClick={() => router.push('/login')}
          >
            ログアウト
          </LogoutButton>
        </div>

        {/* メッセージ一覧 */}
        <div className="grow overflow-y-auto bg-indigo-300" ref={messagesElementRef}>
          {chatRecords.map((record) => {
            return (
              <div key={record.id} id={record.id} className="m-3">
                <div className={`flex ${record.userName === globalUserName ? 'justify-end' : 'justify-start'}`}>
                  <div className="mr-2 flex flex-shrink-0 flex-col items-end">
                    <div className="ml-auto text-xs">
                      <span className="whitespace-nowrap">
                        {FormatDateUtils.mMDD(DbKeyUtils.extractDateFromDbKey(record.id))}
                      </span>
                      <span className="whitespace-nowrap"> </span>
                      <span className="whitespace-nowrap">
                        {FormatDateUtils.hHmm(DbKeyUtils.extractDateFromDbKey(record.id))}
                      </span>
                    </div>
                    <div className="ml-auto text-xs">{record.userName}</div>
                  </div>
                  <div
                    className={`max-w-md break-words rounded-t-xl p-2 text-sm sm:text-base ${
                      record.userName === globalUserName ? 'rounded-l-xl bg-lime-400' : 'rounded-r-xl bg-white'
                    }`}
                  >
                    {record.message}
                  </div>
                  {record.userName === globalUserName ? (
                    <button
                      className="hover group relative -mr-1 ml-1"
                      onClick={() => handleDeleteButtonClick(record.id)}
                    >
                      ❎
                      <span className="invisible absolute -left-3 -top-4 w-10 rounded bg-slate-600 py-1 text-xs text-white opacity-100 group-hover:visible">
                        削除
                      </span>
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* メッセージ入力＆送信 */}
        <div className="flex flex-shrink-0 items-center bg-slate-100 p-3">
          <input
            className="min-w-0 flex-grow rounded-l border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            type="text"
            placeholder="メッセージ入力"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="ml-2 inline-flex flex-shrink-0 rounded-r bg-blue-500 p-2 text-white hover:bg-blue-700"
            name="sendButton"
            onClick={handleSendButtonClick}
          >
            <span className="font-bold">送信</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="ml-2 h-6 w-6 rotate-90 transform"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </div>
    </AuthGuard>
  );
}
