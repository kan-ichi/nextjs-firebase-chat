import { FIREBASE_REALTIME_DATABASE } from '@/common/constants/firebaseRealtimeDatabase';
import { ChatRecord } from '@/common/types/Chat';
import { getDatabase, onChildAdded, ref } from 'firebase/database';
import { useEffect } from 'react';

/**
 * DBに新しい ChatRecord が追加された際、追加されたレコードを引数の配列にセットします
 */
export function useOnChildChatRecordAdded(setChatRecords: React.Dispatch<React.SetStateAction<ChatRecord[]>>) {
  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, FIREBASE_REALTIME_DATABASE.COLLECTION_CHAT);
    return onChildAdded(dbRef, (snapshot) => {
      const addedRecord = { id: snapshot.key, ...snapshot.val() } as ChatRecord;
      setChatRecords((prev) => [...prev, addedRecord]);
    });
  }, [setChatRecords]);
}
