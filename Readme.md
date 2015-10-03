# Starter Pack using Cycle.js, JSX/ES6 (Babel), and Webpack

Boilerplate for building ES6 web apps using [Cycle](http://cycle.js.org/).

[![Build Status](https://travis-ci.org/killercup/cycle-webpack-starter.svg?branch=master)](https://travis-ci.org/killercup/cycle-webpack-starter)

## Getting Started

1. `npm install`
2. `npm start`
3. Code your app
4. ???
5. PROFIT!

### NPM Tasks

- `npm start` runs Webpack's development server (watches for file changes and reloads your browser)
- `npm run compile` compiles your app for production (minify and optimizes the hell out of your code)
- `npm test` runs lints and tests (currently, there are no tests)
  - `npm run lint` lints your code using [ESLint](eslint.org) (OBEY ESLINT!)

### Vendor Module Packaging

Webpack's [CommonsChunkPlugin](http://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin) is used to split your code and vendor dependencies into separate bundles. Ideally, that allows you to cache dependency code longer than application code and allows you to easily blackbox dependency code when debugging.

To add dependencies to your _vendor_ bundle, just edit `src/vendor.js`.

## Technology

- Cycle.js 1.0 with RxJS, Cycle DOM 3.0 with virtual-dom
- Webpack to package JS code and assets
- Babel.js to compile modern JS to ES5
  - Supports writing JSX with virtual-dom using Cycle DOM's helper (make sure to `import {hJSX} from '@cycle/dom';`)
  - In development mode, JSX/Flow/TypeScript-like type hints are converted to asserts using [typecheck](https://github.com/codemix/babel-plugin-typecheck)

## TODO

- [x] Create HTML files using the [HTML Webpack plugin](https://github.com/ampedandwired/html-webpack-plugin)
- [x] Use hashes in filenames
- [ ] Add Webpack plugins for CSS and asset files
- [ ] Try to integrate Polymer elements
