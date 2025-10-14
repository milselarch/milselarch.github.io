---
title: --C
description: Design goals and plans for my C-to-CA compiler
date: 2025-10-13
draft: false
slug: /blog/mmc-design-decisions/
tags:
  - Compilers
  - CellularAutomata
---

[https://github.com/milselarch/--C](https://github.com/milselarch/--C)

So my goal with this project is to create a compiler from a source programming language
to a 1D cellular automata. The primary reason for this is that I think it's possible
to develop tools to analyze the halt-ability of some classes of programs
when expressed in this form. But I also have personal reasons to want to do this:

1. to be entirely honestly I've always
   thought that writing a compiler sounds cool and wanted an excuse to
   get into an endeavor as massive as this one
2. I did take a compilers course back in uni, but it always felt incomplete
   in the sense that although we had lessons on the different stages of a
   compiler as well as a few labs on lexing and parsing,
   we never actually got around to make a full-fledged compiler.

   Given how stretched thin I was with job search and final year project woes
   this was objectively a good thing, but now that I have the free time, this
   is something I definitely want to get back into.

## On the Choice of Programming Language

So the source programming language could _theoretically_ be anything, but
there a couple of requirements I have in mind in practice:

1. Its gotta be a small programming language  
   Writing a compiler for a language like lua or C is a lot of work, but
   is still possible for a one-man show. C++ / Rust on the other hand is
   basically impossible to solo.
2. Its gotta be performant  
   The performance overhead of executing a program after compiling it
   into a cellular automata is going to be massive no matter what -
   but a language that is designed to be compiled down to hardware
   instructions + has static as opposed to dynamic typing would ideally have less of it.
