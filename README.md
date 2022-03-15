# RS Lang

<p align="center">A Roling Scope School task-project</p>
<p align="center">
<a href="https://github.com/rolling-scopes-school"><img alt="GitHub followers" src="https://img.shields.io/github/followers/rolling-scopes-school?color=faea68&label=RSS&logoColor=faea68&style=for-the-badge"></a>
<a href="https://github.com/rolling-scopes-school/tasks"><img alt="GitHub forks" src="https://img.shields.io/github/forks/rolling-scopes-school/tasks?color=faea68&label=RSS%20Tasks&style=for-the-badge"></a></p>
<ul align="center" style="padding-left: 0;list-style: none;">
  <li><a href="https://rs-lang-blackberryid.netlify.app/">🚀 Deploy (Demo)</a></li>
  <li><a href="https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-2/rs-lang/rslang.md">📗 Technical specification</a></li>
</ul>

---

<h2 align="center">Our team</h2>
<ul align="center" style="padding-left: 0;list-style: none;">
  <li><b>👨‍💻 Dmitry Khomichenko</b> (<a href="https://github.com/BlackBerryID">@BlackBerryID</a>)</li>
  <li>👨‍💻 Artur Saratovkin (<a href="https://github.com/saratovkin">@saratovkin</a>)</li>
  <li>👨‍💻 Yan Poleshko (<a href="https://github.com/shadowinhaze">@shadowinhaze</a>)</li>
</ul>

---

## About

School project. A simple Web application is an analogue of popular services for learning English (vocabulary) through game mechanics. The application can be used by both anonymous (unauthorized users) and registered users. Additional functionality is available for registered users, in the form of statistics and a personal dictionary.

In this school project, our team worked exclusively on the UI part and writing API methods. The backend was provided by RSS, ready-made and not modified.

## Technical Stack

### 🧱 Back-End

[Full documentation and repo](https://github.com/rolling-scopes-school/react-rslang-be)

All information (words, users, their statistic) is stored in a `MongoDB` relational database, the backend was written using `Node.js` and `Express.js` library. The BE is perfectly documented with `Swagger`. The backend is deployed on the free heroku service.

### 🌴 Front-End

Project is written with `Typescript` and `React.js` library. Routing in the project provides `React-Router-Dom` @6.2.1. For the construction statistic graphs `recharts` @2.1.9 was used.

`Redux` @4.1.2 is used for state management. `WEB Storage API` (localStorage) is used for store authorized user (name, token).

The lack of a UI/UX-designer was compensated by using the `Material UI` library with ready for use components.

`SASS` preprocessor (.scss syntax/ css-modules) was used for components stylization.

---

💡 You can deploy your own front-end version:

- Clone repo
- `npm i`
- `npm run start`
