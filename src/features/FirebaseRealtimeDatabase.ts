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
}
