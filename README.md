# GMAT Coach

A personal, web-based study guide for the GMAT. It builds a week-by-week plan around your test date, teaches a method for every question type, and tracks your progress.

It is a plain static site: HTML, CSS and JavaScript with no build step, no dependencies and no server. Your plan, ticks, error log and scores are saved in your browser only.

## What is in it

| Area | What it does |
|---|---|
| **Today** | Countdown, your next step, this week's tasks, a note from the coach |
| **My plan** | A plan generated from your test date, weekly hours and target, with an honest read on whether the hours add up |
| **How to study** | The study habits experienced GMAT coaches agree on |
| **Know the exam** | Structure, timing, scoring, percentiles, booking, fees and rules |
| **Quant, Verbal, Data Insights** | 17 lessons with methods, worked examples and drills |
| **Timing and strategy** | Pacing checkpoints, when to guess, section order, and a pacing timer |
| **Practice questions** | 46 original GMAT-style questions with explanations, in every question format |
| **Error log** | Log misses with the cause and what you will change; get reminded to redo them |
| **Mock exams** | How to take and review practice exams, plus a score tracker with charts |
| **Final week and test day** | Taper plan and checklists |
| **Resources and Sources** | Curated links, and where every fact and piece of advice comes from |

## Put it online with GitHub Pages

1. Open the repository on GitHub and go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose the branch that holds these files and the folder **/ (root)**, then **Save**.
4. After a minute or two the site is live at `https://andersch7.github.io/GMAT-Study-Guide/`.

On a free GitHub plan the repository must be public for Pages to work.

## Use it without putting it online

Download the repository and open `index.html` in a browser. Everything works from disk.

## Your data

Progress is stored in the browser's local storage on the device you use. It does not sync between devices and is never sent anywhere. To move it or keep a copy, use **Settings → Download backup** and **Restore from backup**.

## Editing the content

All content lives in `data/` and can be edited without touching the code in `js/`.

| File | Contains |
|---|---|
| `data/exam.js` | Exam facts, percentiles, fees, policies and their sources |
| `data/plans.js` | The study units, their order and hours, and the practice-exam list |
| `data/lessons-quant.js`, `lessons-verbal.js`, `lessons-di.js` | The lessons |
| `data/guides.js` | How to study, strategy, mock-exam and test-day guides, checklists |
| `data/questions.js` | Practice questions, passages, tables and charts |
| `data/resources.js` | External links and the sources for the study advice |

## Accuracy

Exam facts follow GMAC (mba.com and gmac.com) and were last checked on 16 November 2026. They were gathered from published summaries of the official pages, not read directly from every page, and the external links have not been individually tested. Fees, percentiles and policies change, so confirm anything you will act on at [mba.com](https://www.mba.com/exams/gmat-exam) before relying on it.

The practice questions were written for this guide. They are not official GMAT questions and will not predict your score; use the official practice exams for that.

GMAT is a registered trademark of the Graduate Management Admission Council (GMAC), which is not affiliated with this guide and does not endorse it.
