/**
 * チャットの型定義
 */
export interface Chat {
  userId: string;
  userName: string;
  message: string;
}

/**
 * チャットの型定義（DB用）
 */
export interface ChatRecord extends Chat {
  id: string;
}
