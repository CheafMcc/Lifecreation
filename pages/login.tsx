import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useFirebaseApp } from '../src/lib/firebase';

export default function Login() {
  useFirebaseApp();
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login'|'signup'>('login');
  const [err, setErr] = useState<string|undefined>();

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(undefined);
    try {
      if (mode === 'login') await signInWithEmailAndPassword(auth, email, password);
      else await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = '/';
    } catch (e:any) { setErr(e.message); }
  }

  return (
    <main className="min-h-screen bg-bg text-text flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-sm bg-white p-6 rounded-xl shadow space-y-3 border">
        <h1 className="text-lg font-semibold">{mode==='login'?'Войти':'Регистрация'}</h1>
        <input placeholder="Email" className="w-full border rounded p-2" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Пароль" type="password" className="w-full border rounded p-2" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="w-full bg-brand py-2 rounded font-medium">Продолжить</button>
        <button type="button" className="w-full text-sm text-gray-600 underline" onClick={()=>setMode(mode==='login'?'signup':'login')}>
          {mode==='login'?'У меня нет аккаунта':'У меня уже есть аккаунт'}
        </button>
      </form>
    </main>
  );
}
