@echo off
powershell -Command "Start-Process -FilePath 'C:\xampp\mysql\bin\mysqld.exe' -NoNewWindow"
echo MySQL Database is running on PORT 3306