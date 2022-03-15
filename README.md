# RS Lang

<p align="center">A Roling Scope School task-project</p>
<p align="center">
  <a href="https://github.com/rolling-scopes-school"><img alt="GitHub followers" src="https://img.shields.io/github/followers/rolling-scopes-school?color=faea68&label=RSS&logoColor=faea68&style=for-the-badge"></a>
  <a href="https://github.com/rolling-scopes-school/tasks"><img alt="GitHub forks" src="https://img.shields.io/github/forks/rolling-scopes-school/tasks?color=faea68&label=RSS%20Tasks&style=for-the-badge"></a>
</p>
<p align="center">
  <a href="https://rs-lang-blackberryid.netlify.app/">🚀 Deploy (Demo)</a> <br>
  <a href="https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-2/rs-lang/rslang.md">📗 Technical specification</a>
</p>

<h3 align="center">Our team</h3>
<p align="center">
  <b>👨‍💻 Dmitry Khomichenko</b> (<a href="https://github.com/BlackBerryID">@BlackBerryID</a>)<br>
  👨‍💻 Artur Saratovkin (<a href="https://github.com/saratovkin">@saratovkin</a>)<br>
  👨‍💻 Yan Poleshko (<a href="https://github.com/shadowinhaze">@shadowinhaze</a>)
</p>


## About

School project. A simple Web application is an analogue of popular services for learning English (vocabulary) through game mechanics. The application can be used by both anonymous (unauthorized users) and registered users. Additional functionality is available for registered users, in the form of statistics and a personal dictionary.

In this school project, our team worked exclusively on the UI part and writing API methods. The backend was provided by RSS, ready-made and not modified.


## Stack Technology

### 🧱 Back-End

[Full documentation and repo](https://github.com/rolling-scopes-school/react-rslang-be)

All information (words, users, their statistic) is stored in a `MongoDB` nonrelational database, the backend was written using `Node.js` and `Express.js` library. The BE is perfectly documented with `Swagger`. The backend is deployed on the free Heroku service.

### 🌴 Front-End

- Project is written with `Typescript` and `React.js` library.

`Typescript` - adds statical typification, helps with team-developing and reduce bugs amount in future.

`React.js` - "makes it painless to create interactive UIs". Fast and Component-Based.

- `Redux` @4.1.2 and `Redux-Toolkit` as nowadays the go-to way to use Redux are used for state management. `WEB Storage API` (localStorage) is used for store authorized user data (name, token).

- All API-methods were made with vanilla JS (.ts) without external libraries.

- Routing in the project provides `React-Router-Dom` @6.2.1. 

- For the construction statistic graphs `recharts` @2.1.9 was used.

- The lack of a UI/UX-designer was compensated by using the `Material UI` library with ready for use components.

- `SASS` preprocessor (.scss syntax/ css-modules) was used for component stylisation and extension MUI components inline styles.

- `.eslint` and `.prettier` were used for maintenance code-quality and unified code-writing.

---

💡 You can run your own front-end version:

- Clone repo with FE and BE.
- Read BE documentation and wiki-page for deploying DB version.
- Open App folder, don't forget change address for your BE at /src/api/api.ts
- `npm i`
- `npm run start`

---

### 🛣️ Future plans

If we were to continue developing application, we would like to implement the following things:

- Unit testing (Jest)
- More game types
- Add UI animations
- Auto reAuth (+refresh token), add google auth.
- Fix, fix and fix bugs :)
