# Murugan Trader ADMIN EXE – eppadi use panradhu

## 1. GitHub la podanum
`desktop-admin` folder + `.github` folder 2 ayum repo root la copy pannunga (parent folder `murugan-trader-exe` podadheenga).

## 2. EXE build
GitHub repo -> **Actions** -> **Build Windows EXE** -> **Run workflow**.
Mudinja piragu run page -> **Artifacts** -> `MuruganTraderAdmin-Setup` download (zip kulla `MuruganTraderAdmin-Setup.exe`).
Release link vennum na: `git tag v1.0.0` then `git push --tags` -> **Releases** page la direct download.

## 3. Customer side
`MuruganTraderAdmin-Setup.exe` double click -> auto install -> Desktop shortcut. Vera requirement vendam.
Windows 7 SP1 / 8 / 10 / 11, 32-bit & 64-bit work aagum.

## Notes
- URL maatha: `desktop-admin/main.js` la `SITE_URL`.
- Electron 22.3.27 maatha vendam (Windows 7 support).
- Code-signing illa na SmartScreen "Unknown publisher" varum: More info -> Run anyway.
- Internet venum.
