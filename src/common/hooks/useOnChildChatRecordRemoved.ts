import { FIREBASE_REALTIME_DATABASE } from '@/common/constants/firebaseRealtimeDatabase';
import { ChatRecord } from '@/common/types/Chat';
import { getDatabase, onChildRemoved, ref } from 'firebase/database';
import { useEffect } from 'react';

/**
 * DBから ChatRecord が削除された際、削除されたレコードを引数の配列から除外します
 */
export function useOnChildChatRecordRemoved(setChatRecords: React.Dispatch<React.SetStateAction<ChatRecord[]>>) {
  useEffect(() => {
    const dbRef = ref(getDatabase(), FIREBASE_REALTIME_DATABASE.COLLECTION_CHAT);
    return onChildRemoved(dbRef, (snapshot) => {
      const removedRecord = { id: snapshot.key, ...snapshot.val() } as ChatRecord;
      setChatRecords((prev) => {
        // 削除されたレコードのIDと一致するものを除外して返す
        const updatedRecords = prev.filter((record) => record.id !== removedRecord.id);
        return updatedRecords;
      });
    });
  }, [setChatRecords]);
}
