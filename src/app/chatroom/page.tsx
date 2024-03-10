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
import { useState } from 'react';

export default function ChatRoom() {
  useWindowCloseHandler();
  const router = useRouter();
  const { authUser } = useAuthContext();
  const [globalUserName] = useGlobalUserName();
  const [message, setMessage] = useState('');
  const [chatRecords, setChatRecords] = useState<ChatRecord[]>([]);
  useOnChildChatRecordAdded(setChatRecords);

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
      <h1>Chat Room</h1>
      <div>{authUser?.uid}</div>

      {/* ログアウトボタン */}
      <LogoutButton onClick={() => router.push('/login')}>ログアウト</LogoutButton>

      {/* お名前*/}
      <div>
        <label>お名前:</label>
        <label>{globalUserName}</label>
      </div>

      {/* メッセージ入力フォーム */}
      <div>
        <label>メッセージ:</label>
        <input type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>

      {/* 送信ボタン */}
      <button name="sendButton" onClick={handleSendButtonClick}>
        送信
      </button>

      {/* メッセージ一覧 */}
      <div>メッセージ一覧</div>
      <div>
        <div>
          {chatRecords.map((record) => (
            <div key={record.id} id={record.id}>
              <label>{FormatDateUtils.yyyyMMddhhmmss(DbKeyUtils.extractDateFromDbKey(record.id))}</label>
              <label> </label>
              <label>{record.userName}</label>
              <div>{record.message}</div>
            </div>
          ))}
        </div>
      </div>
    </AuthGuard>
  );
}
