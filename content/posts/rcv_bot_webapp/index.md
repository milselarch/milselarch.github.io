---
title: Adding a webapp inside Telegram
description: An overview for how I added an integrated
  webapp to my ranked choice voting telegram bot
date: 2025-11-06
draft: true
slug: /blog/adding-webapp-to-rcv-bot/
tags:
  - Telegram
  - JWT
---

My original plan for user input into my
[ranked choice voting telegram bot](https://github.com/milselarch/RCV-tele-bot)
was to have all actions be done via text commands:

![bot text input](./text_input.png)

But after getting complaints about text input for voting being
unintuitive, and after learning about the possibility of [embedding
webapps within Telegram](https://core.telegram.org/bots/webapps)
itself, I thought I would try to leverage this to make a second
way from which users can cast votes.

## The chatbot backend

So in telegram there are three types of chats -
super chats, group chats, and private chats. We don't care about the
former at all, and you can't open a webapp from a group chat, but
for private chats you can create a
[`KeyboardButton`](https://docs.python-telegram-bot.org/en/stable/telegram.keyboardbutton.html)
that when clicked, will spawn a webapp with the url you specified
when creating said button.

```python:title=base_api.py
@classmethod
def build_private_vote_markup(
    cls, poll_id: int, tele_user: TeleUser,
    ref_message_id: int = BLANK_ID, ref_chat_id: int = BLANK_ID
) -> List[List[KeyboardButton]]:
    poll_url = cls.generate_poll_url(
        poll_id=poll_id, tele_user=tele_user,
        ref_message_id=ref_message_id, ref_chat_id=ref_chat_id
    )
    logger.warning(f'POLL_URL = {poll_url}')
    # create vote button for reply message
    markup_layout = [[KeyboardButton(
        text=f'Vote for Poll #{poll_id} Online',
        web_app=WebAppInfo(url=poll_url)
    )]]

    return markup_layout
```

## The web frontend

## The web backend
