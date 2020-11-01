@ECHO OFF
SETLOCAL
SET "sourcedir=/Users/rbandoo/covercrops/public/images/Cover Crop Photos"

FOR /f "delims=" %%A IN (
 'dir /b /a-d "%sourcedir%\*" '
 ) DO (
 FOR /f "delims=" %%a IN (
  'dir /b /l "%sourcedir%\%%A" '
  ) DO (
  if "%%~xa" neq "%%~xA" ECHO REN "%sourcedir%\%%A" "%%~nA%%~xa"
)
)

GOTO :EOF
