---
date: '2'
title: 'RCV Tele Bot'
cover: './RCV-3S2-dark-bg-50p.png'
github: 'https://github.com/milselarch/RCV-tele-bot'
external: 'https://t.me/ranked_choice_voting_bot'
tech:
  - Python
  - FastAPI
  - TypeScript
  - React
  - MySQL
  - Rust
---

A bot that allows users to create and vote for
[ranked choice]("https://www.youtube.com/watch?v=7P6aYbUo19U") polls on Telegram.
The bot was created using the [python-telegram-bot](https://github.com/python-telegram-bot/python-telegram-bot)
library on the backend, and uses the [peewee](https://github.com/coleifer/peewee)
SQL ORM for data management. There is also an integrated webapp created using
React + TypeScript that also allows users to vote directly from within Telegram.
