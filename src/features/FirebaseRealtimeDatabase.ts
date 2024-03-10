import { FIREBASE_REALTIME_DATABASE } from '@/common/constants/firebaseRealtimeDatabase';
import { Chat, ChatRecord } from '@/common/types/Chat';
import { DbKeyUtils } from '@/common/utils/DbKeyUtils';
import { child, endAt, get, getDatabase, orderByKey, query, ref, remove, set } from 'firebase/database';
/**
 * Firebase Realtime Database 関連の機能
 */
export module FirebaseRealtimeDatabase {
  /**
   * ChatをDBに追加し、追加したChatRecordを返します
   */
  export async function addChatToDb(chat: Chat): Promise<ChatRecord> {
    const db = getDatabase();
    const dbRef = ref(db, FIREBASE_REALTIME_DATABASE.COLLECTION_CHAT);
    const recordId = DbKeyUtils.generateDbKey();
    const newPostRef = child(dbRef, recordId);
    await set(newPostRef, chat);
    return { id: recordId, ...chat };
  }

  /**
   * DBから古いChatRecordを削除します
   */
  export async function deleteOldChatRecordsFromDb() {
    // 基準年月日のDBキーを生成
    const deletionDateTime = new Date();
    deletionDateTime.setDate(deletionDateTime.getDate() - 10);
    const deletionDbKeyEndAt = `${DbKeyUtils.generateDbKeyDateTimePart(deletionDateTime)}${'z'.repeat(32)}`;
    // データベースから基準年月日以前のデータを取得し、削除
    const db = getDatabase();
    const dbRef = ref(db, FIREBASE_REALTIME_DATABASE.COLLECTION_CHAT);
    const oldRecordQuery = query(dbRef, orderByKey(), endAt(deletionDbKeyEndAt));
    const snapshot = await get(oldRecordQuery);
    snapshot.forEach((childSnapshot) => {
      remove(childSnapshot.ref);
    });
  }
}
