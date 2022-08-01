# single-spa vanilla JS

This is an example application that uses [single-spa-html](https://single-spa.js.org/docs/ecosystem-html-web-components/) that is enhanced with plain JavaScript.

This example is modeled after a simple usecase: obtaining cookie consent from your users. The markup is relatively simple, the interactions don't do much, but some JavaScript is required to get it to work. This example highlights the following features:

- using single-spa-html along with plain JavaScript
- html template is extracted out of the js file
- styles are included
- transitions in and out

`index.js` is commented to show how and why the code is written the way it is. To reset the UI after having "accepted", delete the `cookie-consent` localStorage value using your browser's devtools.

## Overview

This repo is used in conjunction with four other repos listed below. Together they make up an application composed of microfrontends. Each app can be updated and deployed independently from the others.

- [**Root Config**](https://github.com/actionanand/single-spa-demo-root-config)
- [**Angular App**](https://github.com/actionanand/single-spa-angular)
- [**React App**](https://github.com/actionanand/single-spa-react)
- [**Vue App**](https://github.com/actionanand/single-spa-vue)
- [**Svelte App**](https://github.com/actionanand/single-spa-svelte)
- [**Nav Bar App**](https://github.com/actionanand/single-spa-nav)
- [**Footer App**](https://github.com/actionanand/single-spa-footer)
- [**404 App**](https://github.com/actionanand/single-spa-404)
- [**Vanilla JS App** (This Repo)](https://github.com/actionanand/single-spa-vanilla-js)

## Demo

You can find the demo here: [Single-Spa-Demo App](https://ar-single-spa-demo.herokuapp.com/)

### Running locally

```bash
yarn start
```

- navigate to [http://localhost:20228/](http://localhost:20228/)

[standalone-single-spa-webpack-plugin](https://github.com/single-spa/standalone-single-spa-webpack-plugin) enables local development using a locally served web page.


## How to build for production

```bash
yarn build
```


## How to serve raw github content as CDN

```
https://cdn.jsdelivr.net/gh/<github-username>/<github-repo-name@branch-name>/<filename>
```


### Running in an existing root-config

- `yarn start`
- Include this module's entry in your import map

  ```js
  {
    imports: {
      ... // other imports
      "@actionanand/single-spa-vanilla-js": "http://localhost:20228/index.js"
    }
  }
  ```

  - the webpack config outputs the app entry url for a better DX

- [Register as a single-spa application](https://single-spa.js.org/docs/api/#registerapplication) in your root config

  ```js
  registerApplication({
    name: "@actionanand/single-spa-vanilla-js",
    app: () => System.import("@actionanand/single-spa-vanilla-js"),
    activeWhen: ["/"],
  });
  ```

## Cloning Guide

### clone only the remote primary HEAD (default: origin/master)
```bash
git clone <url> --single-branch
```

### Only specific branch

```bash
git clone <url> --branch <branch> --single-branch [<folder>]
```

```bash
git clone <url> --branch <branch> 
```

### Cloning repositories using degit

```bash
npx degit github:user/repo#branch-name <folder-name>
```
- master branch is default.

```bash
npx degit github:actionanand/single-spa-vanilla-js#2-skeleton single-spa-vanilla-js
```

## How It Works

This project uses [single-spa](https://single-spa.js.org/) to architect an app composed of `micro-frontends`. In the root config, the four microfrontend apps (angular, react, vue, and svelte) are registered with singe-spa. The main `index.ejs` file contains an import map, which references where to find the compiled JavaScript bundle for each microfrontend. [SystemJS](https://github.com/systemjs/systemjs) is the module loader which then loads the bundles when needed.


### NB

Each repo can be set up with [Travis CI](https://travis-ci.org/) for running jobs as part of a continuous integration pipeline. When new code is pushed to the master branch for any of the repos, the new code is compiled and then uploaded to AWS S3, which serves as a CDN. The CI job also updates the import map file to reference the new bundle for the updated project.

### Sources

- [How to Develop and Deploy Micro-Frontends with Single-SPA](https://www.freecodecamp.org/news/developing-and-deploying-micro-frontends-with-single-spa/)
- [Fun with Micro-frontend in a single-spa way](https://dev.to/nitinreddy3/fun-with-micro-frontend-in-a-single-spa-way-1iok)
- [Connect Micro frontends with the Single-Spa framework. Step by step guide.](https://obaranovskyi.medium.com/connecting-micro-frontends-with-the-single-spa-framework-step-by-step-guide-e7fa87306bc7)
- [RawGit](https://rawgit.com/)
- [Raw Github js file not loading (direct link) like CDN - stackoverflow](https://stackoverflow.com/questions/62901066/raw-github-js-file-not-loading-direct-link-like-cdn/)
- [How to deploy a React, Angular and Vue project to Github pages](https://deepinder.me/how-to-deploy-a-react-angular-vue-project-to-github-pages)