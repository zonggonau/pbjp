@echo off
echo Converting soal.txt to data.json...
python parse_soal.py
if %ERRORLEVEL% EQU 0 (
    echo.
    echo Success! Check data.json
    pause
) else (
    echo.
    echo Error occurred. Make sure Python is installed.
    pause
)
