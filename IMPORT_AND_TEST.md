# MagnaTayISU.aia — Import, Build & Test Instructions

## What you received
`MagnaTayISU.aia` — a real MIT App Inventor 2 project (not a mockup). It was generated as standard App Inventor source (`.scm` designer files + `.bky` Blockly files, `project.properties`) and machine-validated:
- 5 screens parse correctly: **Screen1 (Dashboard), StepTracker, FoodLog, History, Settings**
- Every component, event, method and property referenced in the blocks exists in the official App Inventor component definitions (checked against MIT's component metadata — e.g., Pedometer uses the real `WalkStep` event and `WalkSteps` property)
- All called procedures are defined; all TinyDB components use namespace **`MagnaTayISU_DB`** on every screen

> ⚠️ Final verification only YOU can do: import into your account and test the Pedometer on a physical Android phone. No emulator has a step sensor, and background step counting is not guaranteed — the app states this on the Step Tracker screen itself.

## Import (2 minutes)
1. Go to https://ai2.appinventor.mit.edu and sign in.
2. **Projects → Import project (.aia) from my computer** → choose `MagnaTayISU.aia`.
3. Open each screen and check the Designer matches the guide (`README_DEVELOPMENT_GUIDE.md`).
4. Open **Blocks** per screen and confirm there are no red error triangles / warnings. If App Inventor auto-upgrades any component version on first open, just let it and re-save (Save Project).

## Connect a phone
- Install **MIT AI2 Companion** on an Android phone, or build the APK: **Build → Android App (.apk)**, install it, and allow any motion/sensor prompt.
- Physical phone is REQUIRED for step tests.

## 10-minute smoke test (in order)
1. **Dashboard:** opens, shows 0 steps, today's date, 0 kcal. No crash on fresh install.
2. **Food Log:** food list shows 18 Filipino foods. Search `Adobo` → 2 results. Search cleared → full list.
3. Select **Cooked White Rice**, servings `2` → Preview: **400 kcal**. Meal = Lunch → **Add to Today's Log** → appears below, Total = 400.
4. Go **Back** → Dashboard now shows Food calories 400, entries 1 (auto-refresh via OtherScreenClosed).
5. Tap today's entry in Food Log → **Update** servings to `1` → total becomes 200. Then **Delete** → confirm → total 0.
6. Re-add Rice ×2 (400) for step 9.
7. **Step Tracker:** press **Start Tracking**, walk 30–50 steps with screen open → steps rise, distance ≈ steps × 0.0076 km. Press **Pause**.
8. Force-close the app, reopen → Dashboard step total is retained and **not doubled**.
9. Set goal `100` in Step Tracker (or Settings) → Save → dashboard/goal % updates.
10. **History:** weekly summary shows your steps; pick another date with DatePicker → that date only / "No records for this date."
11. **Settings:** change stride to `70`, save → distance estimate changes on Dashboard.
12. Custom food: add `Test Food`, 250 kcal → select it, servings 2 → 500 kcal.

## If something does not work — check these first
| Symptom | Likely cause / fix |
|---|---|
| Steps stay 0 | Screen must stay open while walking; phone may lack a step sensor (status label explains). Try the built APK instead of Companion. Shake test: walk, don't just tap the phone. |
| Food list empty | Open Food Log once — the database seeds on first Initialize. If you used Clear All Data, reopen Food Log to reseed. |
| Data not shared between screens | TinyDB namespace must be `MagnaTayISU_DB` everywhere (already set — don't change it on one screen only). |
| Numbers look wrong after edit | Edit flow: tap entry in *Today's Log* first, change servings/meal, then **Update Selected Entry**. |
| Import warning about versions | Let App Inventor upgrade the project, then Save. Do not downgrade component versions manually. |

## Feature map (for your defense)
- **Dashboard** — `LoadDailyRecords` + `UpdateDashboard` procedures; refreshes on Initialize and OtherScreenClosed.
- **Steps** — Pedometer `WalkStep` assigns (never adds) `WalkSteps` to session steps; total = saved-at-start + session; saved to TinyDB tag `steps_yyyy-MM-dd`. This is the anti-duplicate design.
- **Food** — entries are lists `[id, date, meal, food, servings, unit, kcal/serving, total]` stored under `food_entries`; edit/delete use the entry's position in the full list via a parallel index list, so filtered views can't corrupt other records. Formula: `total = kcalPerServing × servings` (Rice 200 × 2 = 400).
- **History/Weekly** — `GenerateWeeklySummary` loops the last 7 dates, totals steps, averages over days with data, counts goal days, and shows a simple achievement label. Consumed vs. walking calories are always separate — no fake deficit.
- **Settings** — `goal`, `stride_cm`, `weight_kg` in TinyDB; validated ranges; Clear All Data uses TinyDB.ClearAll after confirmation.
- Formulas: Distance = steps × stride(m) ÷ 1000. Walking kcal ≈ weight × km × 0.53 if weight is set, else steps × 0.04.

## Known limitations (say these proactively)
1. Pedometer counts only while the Step Tracker screen is open/foreground on most devices.
2. TinyDB is local to one device — no sync, no accounts; clearing app data erases records.
3. All calorie/distance figures are estimates based on average servings and stride length.
4. Search is case-sensitive on the food name (type `Adobo` with capital A as in the list).

Full test checklist: `testing/TESTING_CHECKLIST.md` (42 cases).
