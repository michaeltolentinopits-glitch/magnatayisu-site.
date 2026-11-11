# MagnaTayISU_Background.aia — Background Step Tracking Version

## Ano ito
Hiwalay na version ng MagnaTayISU na gumagamit ng **Itoo Sky 4.5.0 extension** (foreground service, Health type) para **tuloy-tuloy na magbilang ng steps kahit naka-close o naka-background ang app**. Ang original na `MagnaTayISU.aia` (stock components lang) ay **hindi ginalaw** — yun pa rin ang pinaka-sigurado para sa defense.

## Paano ito gumagana (blocks, Screen1)
1. `Screen1.Initialize` → kung hindi pa tumatakbo, `Itoo1.CreateProcess("BackgroundSteps", "MagnaTayISU", "Step tracking is active")` — lalabas ang permanenteng notification (requirement ng Android).
2. Background procedure **`BackgroundSteps(x)`** → ini-instantiate ang Pedometer1 at Clock1 (`evaluate but ignore result`), tapos `Pedometer1.Start`.
3. Procedure **`Pedometer1_WalkStep(walkSteps, distance)`** — sa Itoo 4.5, awtomatikong tinatawag ito ng system (ComponentName_EventName convention; wala nang RegisterEvent block). Kinukuha nito ang delta ng steps at iniimbak sa Itoo storage: `bg_day_steps`, `bg_date`, `bg_last_walksteps`. **Walang TinyDB at walang UI blocks sa background** — bawal yun sa Itoo.
4. Pagbukas mo ng Dashboard, ang `LoadDailyRecords` ay nag-si-sync: kung ang `bg_date` ay ngayon at mas mataas ang `bg_day_steps` kaysa sa TinyDB, yun ang magiging steps mo ngayon (pati sa History/Weekly).

## Import at setup (APK lang — HINDI gagana sa Companion)
1. Import `MagnaTayISU_Background.aia` sa https://ai2.appinventor.mit.edu
   - Kung mag-error ang extension sa import, i-import muna nang manual ang kasamang **`xyz.kumaraswamy.itoo.aix`** (Extensions → Import extension), saka i-import ang .aia.
2. **Build → Android App (.apk)** at i-install sa totoong phone.
3. Buksan ang app isang beses — dapat lumabas ang notification na "Step tracking is active".
4. **Pinakamahalaga:** Settings ng phone → Apps → MagnaTayISU → Battery → **Unrestricted / No restrictions**. Kung hindi, papatayin ng Android ang service (lalo na sa Samsung at Xiaomi) at titigil ang pagbilang.
5. Payagan din ang **Notifications** para sa app (Android 13+).

## Test na magpapatunay
1. Buksan ang app, tingnan ang Dashboard steps.
2. Isara ang app (Home, o swipe sa recents — huwag Force Stop).
3. Maglakad ng 100+ steps.
4. Buksan ulit ang app → dapat nadagdagan ang steps sa Dashboard kahit sarado ito kanina.
5. Subukan din: ibang app ang gamitin habang naglalakad → bumalik sa MagnaTayISU → tingnan kung nadagdagan.

## Mga limitasyon at troubleshooting
- **Force Stop** (Settings → Apps → Force Stop) = patay ang service hanggang buksan mo ulit ang app.
- May mga phone brand na agresibong pumapatay ng services kahit naka-Unrestricted — kung mangyari, yun ang dahilan; hindi ito bug ng blocks mo.
- Ang Step Tracker screen sa version na ito ay **display na lang** — ang pagbilang ay hawak ng background service. I-tap ang Start Tracking button doon at may paliwanag itong ipapakita.
- Ang Reset Today sa Step Tracker ay nagre-reset ng TinyDB record; ang background counter ng araw ay magre-reset sa hatinggabi (bagong `bg_date`).
- Itoo ay third-party extension (hindi gawa ng MIT). Kung pumalya ito sa phone mo, gamitin ang stock `MagnaTayISU.aia` at ideklara ang foreground-only tracking bilang limitation — yun ang plano B.

## Defense note
Kung tanungin kung bakit may dalawang version: *"Ang stock Pedometer ng App Inventor ay foreground-only. Gumawa kami ng pangalawang version gamit ang Itoo foreground-service extension (Health service type) para sa background counting, at pinanatili namin ang stock version bilang fallback dahil ang extension ay nangangailangan ng APK build at unrestricted battery setting."*
