/**
 * 日付フォーマット関連ユーティリティ
 */
export module FormatDateUtils {
  /**
   * 日付をフォーマットします。
   */
  export function yyyyMMddhhmmss(date: Date | null): string {
    if (date === null) return '';
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    const formattedDate = new Intl.DateTimeFormat('ja-JP', options).format(date);
    return formattedDate;
  }
}
