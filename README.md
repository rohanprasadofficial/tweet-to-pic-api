<p align="center">
  <img src="https://raw.githubusercontent.com/rohanprasadofficial/tweet-to-pic-api/main/assets/illus.png" height="200px"/>
  <br><br>
  <b>Get image of Twitter tweet.</b>
  <br><br>
</p>

&nbsp;

#### why?

Many people share twitter tweet image to other social platforms like instagram , facebook, linkedin etc..
So might be useful while automating something or even getting tweet if you're lazy enough to screenshot and crop it.
¯\\_(ツ)_/¯

#### usage

Deploy this repo to [heroku](https://www.heroku.com/).

`https://your-deployment.herokuapp.com` will be base URL.

Endpoint:
`/image` will return a image of tweet given certain parameters are passed as query.

| query    |             result              |            values |
| -------- | :-----------------------------: | ----------------: |
| timeline | Adds time & date to the image.  | `true` or `false` |
| stats    | Adds tweets stats to the image. | `true` or `false` |
| actions  |   Adds actions to the image.    | `true` or `false` |

> Note : If you are adding stats , timeline needs to added and if you are adding actions stats needs to be added.

### Examples

Suppose the tweet url is : `https://twitter.com/rohanpdofficial/status/1341019325474344968`

1. Getting default image :
   API URL : `https://your-deployment.herokuapp.com/image?link=https://twitter.com/rohanpdofficial/status/1341019325474344968`

![default](https://raw.githubusercontent.com/rohanprasadofficial/tweet-to-pic-api/main/assets/1.png)

2. Getting image with date & time :
   API URL : `https://your-deployment.herokuapp.com/image?link=https://twitter.com/rohanpdofficial/status/1341019325474344968&timeline=true`

![tweet with datetime](https://raw.githubusercontent.com/rohanprasadofficial/tweet-to-pic-api/main/assets/2.png)

3. Getting image with date & time & stats :
   API URL : `https://your-deployment.herokuapp.com/image?link=https://twitter.com/rohanpdofficial/status/1341019325474344968&timeline=true&stats=true`

   ![tweet with datetime & stats](https://raw.githubusercontent.com/rohanprasadofficial/tweet-to-pic-api/main/assets/3.png)

4. Getting image with date & time & stats & actions:
   API URL : `https://your-deployment.herokuapp.com/image?link=https://twitter.com/rohanpdofficial/status/1341019325474344968&timeline=true&stats=true&actions=true`

![tweet with datetime & stats & actions](https://raw.githubusercontent.com/rohanprasadofficial/tweet-to-pic-api/main/assets/4.png)

&nbsp;

#### like it?

:star: this repo

&nbsp;

## 🛠 Installation & Set Up

Make sure that you have Node & NPM installed and go inside the cloned directory & follow these steps.

1. Install dependencies

   ```sh
   npm install
   ```

   ```
   cd client && npm install
   ```

2. Run and Enjoy

   ```
   npm run dev
   ```

> Simple Note : /client runs a react app while the base folder is a node app.

&nbsp;

#### license

MIT © [rohanprasadofficial](https://github.com/rohanprasadofficial)

Crafted & Developed in India by Rohan with ❤️
