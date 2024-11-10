@echo off
cd E:\yolo11
call yoloenv\Scripts\activate
cd %~dp0
python inference.py