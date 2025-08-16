@echo off
REM === lifecreation_autopush.bat ===
REM Run this file from inside your project folder or move it there.
setlocal ENABLEDELAYEDEXPANSION

echo [1/7] Checking Git...
git --version >NUL 2>&1
if errorlevel 1 (
  echo ERROR: Git is not installed or not in PATH. Install Git from https://git-scm.com/download/win
  pause
  exit /b 1
)

echo [2/7] Switching to script directory...
cd /d "%~dp0"

echo [3/7] Initializing Git (if needed)...
git rev-parse --is-inside-work-tree >NUL 2>&1
if errorlevel 1 (
  git init || goto :error
)

echo [4/7] Staging files...
git add -A || goto :error

echo [5/7] Creating commit (if none exists)...
git diff --cached --quiet
if errorlevel 1 (
  git commit -m "initial commit" || goto :error
) else (
  echo No changes to commit. Skipping commit step.
)

echo [6/7] Ensuring main branch...
git branch -M main

echo [7/7] Configure remote and push
for /f "tokens=*" %%i in ('git remote') do set HASREMOTE=1
if not defined HASREMOTE (
  set /p REPOURL=Enter your GitHub repo URL (e.g. https://github.com/CheafMcc/Lifecreation.git): 
  if "%REPOURL%"=="" (
    echo You must provide a repository URL.
    goto :error
  )
  git remote add origin "%REPOURL%" || goto :error
) else (
  echo Remote already configured. Using existing origin.
)

git push -u origin main || goto :error

echo.
echo DONE! Your code is pushed to GitHub. Vercel will start a new deploy automatically.
pause
exit /b 0

:error
echo.
echo FAILED. Check the error above. If it says "Please tell me who you are",
echo run the following ONCE (replace with your GitHub name/email):
echo    git config --global user.name "YourName"
echo    git config --global user.email "you@example.com"
pause
exit /b 1