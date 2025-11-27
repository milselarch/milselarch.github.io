---
title: Adding a webapp inside Telegram
description: An overview for how I added an integrated
  webapp to my ranked choice voting telegram bot
date: 2025-11-06
draft: false
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

[`🔗 base_api.py : 525`](https://github.com/milselarch/RCV-tele-bot/blob/6c17375577a3c28d9893a69a2cc3c2a72b1bf88d/base_api.py#L525)

Because this is just going to be a link to another webpage,
the only way to pass information to the web frontend about the user and the poll
would be via the link itself i.e. `GET` params that are
inserted into the link, hence why I pass in params like the poll id and
tele_user (to insert the user ID to query params) into `generate_poll_url`:

```python:title=base_api.py
@classmethod
def generate_poll_url(
    cls, poll_id: int, tele_user: TeleUser,
    ref_message_id: int = BLANK_ID, ref_chat_id: int = BLANK_ID
) -> str:
    ...
    req = PreparedRequest()
    auth_date = str(int(time.time()))
    query_id = cls.generate_secret()
    user_info = json.dumps({
        'id': tele_user.id,
        'username': tele_user.username
    })

    data_check_string = cls.make_data_check_string(
        auth_date=auth_date, query_id=query_id, user=user_info
    )
    validation_hash = cls.sign_data_check_string(data_check_string)
    ref_info = f'{auth_date}:{poll_id}:{ref_message_id}:{ref_chat_id}'
    ref_hash = cls.sign_data_check_string(ref_info)

    params = {
        'poll_id': str(poll_id),
        'auth_date': auth_date,
        'query_id': query_id,
        'user': user_info,
        'hash': validation_hash,

        'ref_info': ref_info,
        'ref_hash': ref_hash
    }
    req.prepare_url(WEBHOOK_URL, params)
    return req.url
```

[`🔗 base_api.py : 492`](https://github.com/milselarch/RCV-tele-bot/blob/6c17375577a3c28d9893a69a2cc3c2a72b1bf88d/base_api.py#492)

So theres quite a few things being encoded here but essentially

## The web frontend

## The web backend
