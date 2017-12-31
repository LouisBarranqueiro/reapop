# Contributing #

All kinds of contributions (enhancements, new features, documentation & bugs reporting) are welcome.

### Setting up your environment

```
# clone repository
git clone https://github.com/LouisBarranqueiro/reapop.git

cd reapop

# install dependencies
npm install

# Launch demo at http://localhost:3000
npm start
```

Here is the list of the available npm scripts :

| `npm run <script>`   | Description |
| -------------------- | ----------- |
| start                | Launch demo at http://localhost:3000 |
| compile              | Compile demo site to `demo/dist` folder |
| lint                 | Lint javascript files of source folder (`src`) and demo source folder (`demo`) |
| lint:fix             | Lint and fix javascript files of source (`src`) and demo source (`demo`) |
| react:14             | Switch to React 0.14 and Redux 2 |
| react:15             | Switch to React 15  and Redux 3 |
| react:16             | Switch to React 16  and Redux 3 |
| react-redux:2        | Switch to react-redux 2 |
| react-redux:3.1      | Switch to react-redux 3.1 |
| react-redux:4        | Switch to react-redux 4 |
| react-redux:5.0.6    | Switch to react-redux 5.0.6 |
| test                 | Run tests with Karma |
| test:coverage        | Run tests with Karma and generate coverage report (HTML and LCOV) |
| test:all             | Run tests with Karma on all possible configurations with react, redux and react-redux |
| test:watch           | Run tests with Karma and watch for changes to re-run test. Useful for TDD. |
| prepublish           | Compile ES6 code (`src`) in ES5 code (`lib`) with babel |

Example :

```
npm run compile
``` 


## Questions & bugs reporting ##

When you create an issue to report a bug or ask a question, think about include useful information like :

 - Operating system with version
 - Browser with version
 - Reapop version (original or not)
 - React version
 - Redux version
 - React-redux version

and all others related information that are susceptible to help us.

### Pull requests  ##

All pull requests must be done on the **master** branch.

Before a pull request :

 - Don't forget to update README or documentation if it's necessary
 - Check code status with `npm run lint` 
 - Run tests with `npm run test` 
 - If you made styles changes or any changes related to user interfaces, launch demo with `npm start` to check the result in the browser. Check it on all possible browsers that you have. (Precise the list in the PR)
