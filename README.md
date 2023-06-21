# XState Meme

Special thanks to [Nick Taylor](https://nickyt.live/) for having me on his stream to chat about this!

![7phhcq](https://github.com/nicknisi/xstate-meme/assets/293805/6e8975bf-e936-44c6-9e99-8569a84508f8)

_(This meme was generated live and on stream!)_

This is a simple, [XState](https://xstate.js.org) + [React](https://react.dev) example. It uses the ImgFlip API to generate random memes without the user knowing what meme template will be associated with their captions!

## ImgFlip API

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
