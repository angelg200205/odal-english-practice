# Viktoria — How to add a scenario

This site loads lessons from JSON files in the app repo (`src/data/`), not from React components. Edit data, save, rebuild/refresh.

## Files
- `src/data/scenarios.json` — dialogues + exercises
- `src/data/topics.json` — journey topic list
- `src/data/glossary.json` — English ↔ 日本語 terms
- `src/data/roleplay-pairs.json` — Class Mode pair role-play cards
- `src/data/problem-customers.json` — Class Mode whole-class problem draws
- `src/data/class-config.json` — teacher PIN (classroom gate only)

Learners are **Japanese staff**. Hints and glossary use **Japanese (`ja`)**, never Korean.

**Policy sources:** Prefer Japan-site ODAL research notes. Use Korean-site research only to fill gaps, and **label which customer group** a fact applies to (e.g. free ETC is Korean-site ODAL; Japan-site guests usually bring their own ETC). Uncertain JA cancel percentages: keep dialogue general or say staff must confirm with a manager — never invent.

## Class Mode (teacher-led)

Live routes (GitHub Pages base `/odal-english-practice/`):
- Hub: `/class`
- Students join: `/class/join`
- Teacher (PIN): `/class/teacher`
- Role-play live: `/class/teacher/roleplay/live/:code`
- Problem customer: `/class/teacher/problems`

Students **cannot** start role-plays alone — they must Join with a 4-character session code from the teacher screen. The code encodes the role-play index + customer variant (Korean / Japanese domestic / other international) deterministically in the browser (no server).

### Change the teacher PIN
1. Open `src/data/class-config.json`.
2. Set `"teacherPin"` (default `"1234"`).
3. Commit and push `main`.
4. Tell teachers the new PIN. This is a **light classroom gate only**, not real security — anyone who can read the JSON (or the built JS) can find it.

### Add a role-play pair
1. Open `src/data/roleplay-pairs.json`.
2. Copy an existing object.
3. Unique `id` (kebab-case). Keep `staff` (Role A) with `secret`, `goal`, and 2–3 `phrases` (`en` + `ja`).
4. Fill `customers.korean`, `customers.japanese`, and `customers.international` the same way (Role B variants).
5. Add `answerKey.staffSummary`, `customerNotes`, and `listenFor` (checklist phrases for Reveal).
6. Facts only — label Japan-site vs Korean-site when rules differ.
7. Save, preview with `npm run dev`, then push `main`.

Do **not** reorder existing pairs casually: session codes store the **array index**. Prefer appending new pairs at the end.

### Add a problem-customer card
1. Open `src/data/problem-customers.json`.
2. Copy an object; unique `id`.
3. Set `difficulty`: `easy` (calm), `medium` (upset), or `hard` (very angry).
4. Write English `situation`, Japanese `jaHint`, `modelAnswer`, and `keyPhrases`.
5. Verified ODAL facts only; no invented prices/phones.
6. Save and push `main`.

## Steps
1. Open `src/data/scenarios.json`.
2. Copy an existing scenario object as a template.
3. Give a unique `id` (kebab-case), e.g. `etc-lane-practice`.
4. Set `topicId` to one of: `booking`, `airport-shuttle`, `counter-checkin`, `insurance-noc`, `free-items`, `car-inspection`, `driving-tips`, `fuel-return`, `accidents`, `cancellations`, `special-situations`.
5. Write a short `summary`, `grammarFocus`, and `dialogue` (staff ↔ customer).
6. Add optional Japanese hints on hard words: `"hints": [{ "word": "receipt", "ja": "領収書" }]`.
7. Add four exercises (one of each type is ideal): `fillBlank`, `multipleChoice`, `sentenceOrder`, `politeChoice`.
8. Use **only verified ODAL facts** from the research notes. Do not invent prices, hours, or phone numbers.
9. Save the file and run the app (`npm run dev`) to preview.

## Sample scenario snippet

```json
{
  "id": "sample-wristband",
  "title": "Giving a wristband at stop 14",
  "topicId": "airport-shuttle",
  "grammarFocus": "Please + imperative; May I…?",
  "summary": "Confirm the guest name and give a wristband at bus stop 14.",
  "dialogue": [
    {
      "speaker": "staff",
      "text": "May I have your name, please? Here is your wristband.",
      "hints": [
        { "word": "wristband", "ja": "リストバンド" }
      ]
    },
    {
      "speaker": "customer",
      "text": "Thank you. How long is the wait?"
    },
    {
      "speaker": "staff",
      "text": "The shuttle runs about every 15 to 20 minutes."
    }
  ],
  "exercises": [
    {
      "id": "sample-wristband-fb",
      "type": "fillBlank",
      "prompt": "Complete the polite request.",
      "sentence": "___ I have your name, please?",
      "blanks": ["May"],
      "explanation": "May I…? is a polite request."
    },
    {
      "id": "sample-wristband-mc",
      "type": "multipleChoice",
      "prompt": "Choose the correct routine sentence.",
      "choices": [
        "The shuttle run every 15 minutes.",
        "The shuttle runs about every 15 to 20 minutes."
      ],
      "correctIndex": 1,
      "explanation": "Present simple describes schedules."
    },
    {
      "id": "sample-wristband-so",
      "type": "sentenceOrder",
      "prompt": "Put the words in order.",
      "words": ["Here", "is", "your", "wristband"],
      "correctOrder": ["Here", "is", "your", "wristband"],
      "explanation": "Here is + noun is a natural hand-over line."
    },
    {
      "id": "sample-wristband-pc",
      "type": "politeChoice",
      "prompt": "Choose the more polite line.",
      "options": ["Name.", "May I have your name, please?"],
      "correctIndex": 1,
      "explanation": "May I…? + please is softer for guests."
    }
  ]
}
```

## Glossary tip
Add shared terms to `glossary.json` as `{ "en": "…", "ja": "…", "note": "optional" }`.

## Progress
Staff progress is stored in the browser (`localStorage` key `odal-staff-english-progress-v1`). Changing an exercise `id` starts that exercise fresh.

## Republish
Edit JSON → commit → push `main` → GitHub Actions republishes https://angelg200205.github.io/odal-english-practice/

Class Mode: https://angelg200205.github.io/odal-english-practice/class
