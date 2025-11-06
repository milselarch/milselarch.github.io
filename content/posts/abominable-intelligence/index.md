---
title: Abominable Intelligence
description: i.e. most of the generative AI space right now
date: 2025-10-12
draft: false
edgy: true
slug: /blog/abominable-intelligence/
tags:
  - Politics
---

_What is AI?_  
AI is the fitting of a mathematical equation to a bunch of numerical data points,
so that you can create an statistical representation of said data points.

_What is the purpose of all this?_  
Well the idea is that If we get a new data point we can plug it into the equation
and use the interpolated value as a prediction. An example:

- If we had a dataset with numbers representing the cloudiness of the sky
  and the amount of rainfall each day for every day in the past year, we could try to
  fit an equation to that data and then interpolate the amount of rainfall that
  could be expected for today given the number(s) representing how cloudy today is.  
  [TODO: linear regression diagram]

So far so good, predicting stuff sounds innocuous enough -

_So what causes AI to become abominable?_
_[Technology is the application of scientific knowledge to the practical aims of human life](https://www.britannica.com/technology/technology)_

When we run an AI model to predict the weather or figure out whether a picture
is that of a cat or a dog, that's work that no one really cares about.
It’s grunt work - the less of it we have to do to get the outcome we want the
happier we’d be.

Contrast this with the activities that we partake in that we value intrinsically -
taking a walk in the park, hanging out with friends, _creating art_ - If an AI could
automagically make a poem to express whatever it is you wanted to express, would you
really prefer that outcome to your own expression?

And this is where we get Abominable Intelligence.  
Instead of a world where AI menial soul-crushing tasks like figuring out
whether some shitty low-res image is a bicycle or a cat while people create art,
we have a world where people pay generative AI to plagiarize other people's art
while waves of human wage slaves slog away classifying text and images for
[$2 an hour in digital sweatshops](https://time.com/6247678/openai-chatgpt-kenya-workers/).

## AI Art is Theft

The output of every AI model is some combination of multiplication (weights),
addition (biases, linear combinations of inputs), line bending (RELU activation etc.),
and aggregation (e.g. taking the maximum value of a group if pixels in a max-pooling layer).

With generative AI models, we have a system that does math to make a
statistical aggregation of the input text / images / audio, and spits out random
samples of this statistical aggregation soup to create your generative AI image
or whatever. We know it's all just math, so any creativity has to come from the input.
Or more precisely, generative AI is literally just producing a statistical
recombination of the input data.

We know none of these fucking AI companies give two shits about
[sourcing their data](https://youtu.be/mAUpxN-EIgU?si=h4BpyyaPcJLUUTwq&t=264)
from sources that are okay with being trained on and / or compensate the sources
fairly, so in practice, this together with the previous point makes it clear
that the whole thing has become a plagiarism machine for generative
AI companies.

The irony about all this is that your faceless multinational corporations
have been the ones pushing for copyright / IP laws / anti-right-to-repair
legislation this entire time under the pretext of promoting innovation
(something I'm against from a purely rights-based argument, but I'm gonna
save that for a different blog post),
but now the argument for AI specifically is that they should be allowed to
consume and regurgitate everything and anything on the internet in order to
"promote AI innovation" and "not stifle the industry".

> Training AI models using publicly available internet materials is fair use,
> as supported by long-standing and widely accepted precedents.
> We view this principle as fair to creators, necessary for innovators,
> and critical for US competitiveness.
> \- [https://openai.com/index/openai-and-journalism/](https://openai.com/index/openai-and-journalism/)
