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
---

Stream Hub is a video and audio support helpdesk intercom webapp
currently deployed at HDB Hub.  
It is built using:

1. Vue.js & TypeScript for the frontend,
2. FastAPI and WebSockets for the backend signaling server to facilitate video calls using:
3. WebRTC as the protocol for actually doing the video and audio calls.

The following changes were added in response to the needs and / or feedback from the HDB Hub:

1. A background image was added
2. The background image in dark mode is distinct from the background image in light mode
3. the call button color matches the color of the HDB logo
4. The kiosk user sees a loading screen up until the moment that audio is detected
   from the support helpdesk operator on the other side.
5.
