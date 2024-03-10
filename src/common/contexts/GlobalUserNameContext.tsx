'use client';
import { createContext, useContext, useState } from 'react';

/**
 * グローバルにユーザー名を管理するコンテキスト
 */
const GlobalUserNameContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(['', () => {}]);

/**
 * グローバルにユーザー名を管理するためのプロバイダーコンポーネント
 * @example
 * // 使用例（layout.tsx に配置すること）
 * export default function RootLayout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <>
 *       <html lang="ja">
 *         <body className={notoSansJP.className}>
 *           <GlobalUserNameProvider>{children}</GlobalUserNameProvider>
 *         </body>
 *       </html>
 *     </>
 *   );
 * }
 */
export function GlobalUserNameProvider({ children }: { children: React.ReactNode }) {
  const [globalUserName, setGlobalUserName] = useState('');
  return (
    <GlobalUserNameContext.Provider value={[globalUserName, setGlobalUserName]}>
      {children}
    </GlobalUserNameContext.Provider>
  );
}

/**
 * グローバルユーザー名にアクセスするためのカスタムフック
 * @example
 * // 関数コンポーネント内での使用例
 * const [userName, setUserName] = useGlobalUserName();
 */
export function useGlobalUserName() {
  const context = useContext(GlobalUserNameContext);
  return context;
}
