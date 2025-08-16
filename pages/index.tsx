import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { useFirebaseApp } from '../src/lib/firebase';
import dynamic from 'next/dynamic';
const AvatarCanvas = dynamic(() => import('../src/components/AvatarCanvas'), { ssr: false });
export default function Home() {
  const app = useFirebaseApp();
  useEffect(() => { console.log('Firebase app initialized:', app?.name); }, [app]);

  return (
    <>
      <Head><title>Life Creation — MVP</title></Head>
      <main className="min-h-screen bg-bg text-text">
        <header className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Life Creation</h1>
          <nav className="flex gap-4 text-sm">
            <Link href="/login">Войти</Link>
            <Link href="/tasks" className="px-3 py-1 rounded bg-brand text-text">Задания</Link>
          </nav>
        </header>
        <section className="px-6 py-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">Твоя жизнь — твоя игра</h2>
            <p className="text-gray-600">Выполняй реальные задания и прокачивай три характеристики: духовную, физическую и интеллектуальную.</p>
            <div className="flex gap-3">
              <span className="inline-block px-2 py-1 rounded bg-spirit/10 text-spirit">Дух</span>
              <span className="inline-block px-2 py-1 rounded bg-phys/10 text-phys">Физ</span>
              <span className="inline-block px-2 py-1 rounded bg-intel/10 text-intel">Интеллект</span>
            </div>
          </div>
          <div className="rounded-xl border shadow p-3 bg-white"><AvatarCanvas /></div>
        </section>
      </main>
    </>
  );
}
