@echo off
echo ================================
echo 🚀 Lancement du serveur Express
echo ================================
echo.

REM Aller dans le dossier du backend
cd /d %~dp0

REM Vérifier que node est installé
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js n'est pas installé ou pas dans le PATH.
    pause
    exit /b
)

REM Lancer le serveur
node server.js

pause
