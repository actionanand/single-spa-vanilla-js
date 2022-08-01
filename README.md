# single-spa vanilla JS

This is an example application that uses [single-spa-html](https://single-spa.js.org/docs/ecosystem-html-web-components/) that is enhanced with plain JavaScript.

This example is modeled after a simple usecase: obtaining cookie consent from your users. The markup is relatively simple, the interactions don't do much, but some JavaScript is required to get it to work. This example highlights the following features:

- using single-spa-html along with plain JavaScript
- html template is extracted out of the js file
- styles are included
- transitions in and out

`index.js` is commented to show how and why the code is written the way it is. To reset the UI after having "accepted", delete the `cookie-consent` localStorage value using your browser's devtools.


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
npx degit github:actionanand/single-spa-vanilla-js#1-cookie-example
```