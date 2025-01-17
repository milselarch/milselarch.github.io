---
date: '2023-10-08'
title: 'VeriFake'
github: ''
external: ''
tech:
  - Python
  - FastAPI
  - PyTorch
  - AWS SageMaker
  - React
  - TypeScript
showInProjects: true
---

VeriFake is a comprehensive deepfake detection system for images and
videos, created as part of a final-year project with [HTX](https://www.htx.gov.sg/).

Users would upload a video or image through a webapp, which would then be
forwarded to AWS SageMaker instances, where our custom deepfake detection
models would analyze the media and predict on whether the media
in question was a deepfake, as well identify the image regions that
contribute the most to the model's predictions.
