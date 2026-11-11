# MagnaTayISU Testing Checklist (42 cases)
Tester: __________  Device: __________ (physical phone required for pedometer)  Date: ______  Result: Pass/Fail + notes

## Step Tracking (ST)
- [ ] ST1 Open StepTracker, Start, walk 30 steps — count increases
- [ ] ST2 Pause — count stops increasing while walking
- [ ] ST3 Close & reopen app — today's total retained, NOT doubled
- [ ] ST4 Reopen StepTracker screen 3x — no duplicate addition
- [ ] ST5 Set goal 100, walk past it — progress shows >=100%, capped display
- [ ] ST6 Reset Day with confirmation — today=0, yesterday's History unchanged
- [ ] ST7 Cancel reset dialog — count unchanged
- [ ] ST8 Device without step sensor / sensor blocked — status message, no crash (if available)
- [ ] ST9 Distance label increases proportionally (1000 steps ≈ 0.76 km at default stride)
- [ ] ST10 Change stride in Settings — distance recalculates

## Food Calculations (FC)
- [ ] FC1 Rice 1 serving = 200 kcal
- [ ] FC2 Rice 2 servings = 400 kcal (preview AND saved total)
- [ ] FC3 Rice 1.5 servings = 300 kcal
- [ ] FC4 Change quantity after selecting — preview updates live
- [ ] FC5 Search "adobo" — shows Chicken + Pork adobo only
- [ ] FC6 Clear search — full list returns
- [ ] FC7 Add to each meal (Breakfast/Lunch/Dinner/Snack) — subtotals correct
- [ ] FC8 Edit entry servings 1→2 — total doubles, same entry (no duplicate created)
- [ ] FC9 Delete entry with confirmation — only that entry removed, total recalculates
- [ ] FC10 Cancel delete — entry remains
- [ ] FC11 Custom food 250 kcal × 2 = 500, appears in food list for reuse
- [ ] FC12 Favorites/quick re-log (if implemented) adds correct values

## Validation (V)
- [ ] V1 Add with no food selected — error message, nothing saved
- [ ] V2 Servings = 0 / -1 / "abc" / empty — error, nothing saved, no crash
- [ ] V3 Goal = 0 / "abc" / 999999 — rejected with message
- [ ] V4 Custom food empty name or kcal<=0 — rejected

## Persistence & Dates (P)
- [ ] P1 Log food + steps, force-close app, reopen — all present
- [ ] P2 Build APK, restart phone, open — data present
- [ ] P3 History: select different date — shows that date only / empty state
- [ ] P4 Log entry today, view yesterday — entry NOT shown there
- [ ] P5 Reset today — previous dates intact in History
- [ ] P6 Invalid input attempts (V2-V4) do not corrupt existing records

## UI & Navigation (U)
- [ ] U1 Every button on every screen performs its labeled action
- [ ] U2 Back buttons return to Dashboard; OtherScreenClosed refreshes totals
- [ ] U3 Dashboard after logging food shows updated kcal + meals count without restart
- [ ] U4 Empty states visible on fresh install ("No records for this date.")
- [ ] U5 Text readable on your phone + one smaller/larger screen if available
- [ ] U6 Long food list scrolls and is searchable
- [ ] U7 Delete/reset confirmations appear

## Weekly Report (W)
- [ ] W1 Hand-compute 7-day total from History — matches Weekly Summary
- [ ] W2 Average uses only your documented rule (days with data) — verify by hand
- [ ] W3 Goal-days count matches days steps>=goal
- [ ] W4 Consumed and burned shown separately; NO deficit number displayed

Notes / bugs found & fixed: ______________________________________________
