# XState Meme

This project started its life as an example for [Nick Taylor's](https://nickyt.live) Twitch [stream](https://www.youtube.com/watch?v=F8EGZCcEOn8) and was adapted to be the primary example for my talk, [Componentizing Application State](https://nicknisi.github.io/xstate-meme/) at [KCDC](https://kcdc.info).

## KCDC 2023 Talk - Componentizing Application State

- [Slides](https://nicknisi.github.io/xstate-meme/)
- [Code link](https://github.com/nicknisi/xstate-meme)

Special thanks to the [KCDC team](https://kcdc.info) for the opportunity to speak!

![7q8apz](https://github.com/nicknisi/xstate-meme/assets/293805/0e9d1d02-7605-454a-a6d6-0e594139cad3)
_(This meme was generated live and on stage at KCDC!)_


## Nick Taylor Stream

- [Stream link (YouTube)](https://www.youtube.com/watch?v=F8EGZCcEOn8)
- [Code link (01fdf4e)](https://github.com/nicknisi/xstate-meme/tree/01fdf4e11a177f6205f4f236bb2a5a09504a8e0f)

Special thanks to [Nick Taylor](https://nickyt.live/) for having me on his stream to chat about this!

![7phhcq](https://github.com/nicknisi/xstate-meme/assets/293805/6e8975bf-e936-44c6-9e99-8569a84508f8)

_(This meme was generated live and on stream!)_

This is a simple, [XState](https://xstate.js.org) + [React](https://react.dev) example. It uses the ImgFlip API to generate random memes without the user knowing what meme template will be associated with their captions!

## ImgFlip & Open AI APIs

To use the ImgFlip API, you'll need an [account](https://imgflip.com/signup). Specifically, you'll need to send the username and password in every request to generate a meme. To add this, add them to a `.env.development` file in the project.

Additionally, you'll want an [Open AI](https://openai.com/) API Key added to the file as `VITE_OPENAI_API_KEY`.
**Note:** This is a paid service which requires a credit card, but it is very low cost.

The `.env.development` file should look like the following:

```config
VITE_MEME_USERNAME="<USERNAME>"
VITE_MEME_PASSWORD="<PASSWORD>"
VITE_OPENAI_API_KEY="<API_KEY>"
```

## Getting started

Start the dev server on port `3000`.

```bash
npm start
```

Start Storybook on port `6006`.

```bash
npm run storybook
```

## Links

- Check out [XState](https://xstate.js.org/docs/)
- [Storybook](https://storybook.js.org)
- [storybook-xstate-addon](https://github.com/SimeonC/storybook-xstate-addon)
