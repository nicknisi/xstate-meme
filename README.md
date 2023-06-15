# XState Meme

Special thanks to [Nick Taylor](https://nickyt.live/) for having me on his stream to chat about this!

![7phhcq](https://github.com/nicknisi/xstate-meme/assets/293805/6e8975bf-e936-44c6-9e99-8569a84508f8)

*(This meme was generated live and on stream!)*


This is a simple, [XState](https://xstate.js.org) + [React](https://react.dev) example. It uses the ImgFlip API to generate random memes without the user knowing what meme template will be associated with their captions!

## ImgFlip API

To use the ImgFlip API, you'll need an account. Specifically, you'll need to send the username and password in every request to generate a meme. To add this, add a `.env.development` file to the root of the project with the following:

```config
VITE_MEME_USERNAME='<USERNAME>'
VITE_MEME_PASSWORD='<PASSWORD>'
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
