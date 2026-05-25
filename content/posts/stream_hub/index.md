---
title: Stream Hub
description: A web-based support helpdesk for HDB Hub
date: 2026-05-25
draft: false
slug: /blog/stream-hub/
tags:
  - WebRTC
  - WebSockets
  - FastAPI
  - VueJS
---

Stream Hub is a video and audio support helpdesk intercom webapp
currently deployed at HDB Hub.  
Members of the public can start an audio and / or video call with support staff
by pressing the "Request Assistance" button on the kiosk screen
(This changes into the "End Call" button you see in the screenshots once
you've already entered into a call).

Stream Hub was built using:

1. Vue.js & TypeScript for the frontend,
2. FastAPI and WebSockets for the backend signaling server to facilitate video calls using:
3. WebRTC as the protocol for actually transmitting the video and audio call streams.

![light_dark_kiosk_screens](./light_dark_covers.png)
