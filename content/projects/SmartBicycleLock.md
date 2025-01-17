---
date: '2017-01-30'
title: 'smart-bicycle-lock'
github: 'https://github.com/milselarch/smart-bicycle-lock'
external: ''
tech:
  - Android
  - Java
  - C
  - NodeMCU
  - PIC microcontroller
  - Bluetooth
showInProjects: true
---

A bluetooth operated bicycle lock that can be controlled via an Android app written in java.
The firmware for the lock itself is written in C, with implementations for both
PIC and ESP8266 microcontrollers. A custom length-prefix message protocol was implemented
to allow for communication between the lock and the app over bluetooth.
