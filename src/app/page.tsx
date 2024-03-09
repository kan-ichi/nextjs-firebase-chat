'use client';
import { useWindowCloseHandler } from '@/common/hooks/useWindowCloseHandler';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  useWindowCloseHandler();
  const router = useRouter();

  useEffect(() => {
    router.push('/chatroom');
  }, [router]);

  return <></>;
}
