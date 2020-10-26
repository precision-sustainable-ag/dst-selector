@echo off
setlocal EnableDelayedExpansion

set "exts= "
for %%f in (*.*) do if "!exts:%%~Xf=!" equ "!exts!" set "exts=!exts! %%~Xf"
for %%c in (a b c d e f g h i j k l m n o p q r s t u v w x y z) do set "exts=!exts:%%c=%%c!"
for %%e in (%exts%) do ren "*%%e" "*%%e"

