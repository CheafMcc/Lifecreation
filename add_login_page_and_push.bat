@echo off
REM === add_login_page_and_push.bat ===
setlocal ENABLEDELAYEDEXPANSION

echo [1/6] Checking Git...
git --version >NUL 2>&1
if errorlevel 1 (
  echo ERROR: Git is not installed or not in PATH. Install Git from https://git-scm.com/download/win
  pause
  exit /b 1
)

echo [2/6] Switching to script directory...
cd /d "%~dp0"

echo [3/6] Creating app\login\page.tsx (App Router)...
mkdir app\login >NUL 2>&1
REM Write TSX content via PowerShell to preserve quotes/braces
powershell -NoProfile -Command ^
  "$code = @'^
'use client';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { useEffect, useState } from 'react';

export default function LoginPage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        setToken(localStorage.getItem('token'));
      } catch {}
    }
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Login</h1>
      <p>Token: {token ?? '—'}</p>
    </main>
  );
}
^'@; Set-Content -LiteralPath 'app/login/page.tsx' -Value $code -Encoding UTF8" || goto :error

echo [4/6] Git add/commit...
git add -A || goto :error
git commit -m "add login page (client-only to avoid prerender error)" || echo No changes to commit.

echo [5/6] Ensure main branch and push...
git branch -M main
git push -u origin main || goto :error

echo.
echo DONE! Login page added and pushed. Vercel will redeploy automatically.
echo After deploy, check:  /login  on your Vercel URL.
pause
exit /b 0

:error
echo.
echo FAILED. Read the error above and share it with your assistant if needed.
pause
exit /b 1