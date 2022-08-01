import singleSpaHtml from 'single-spa-html'; // single-spa lifecycles helper
import template from './template.html'; // separate html template provides better syntax highlighting
import styles from './styles.css'; // CSS Modules; pitfall: ensure that your CSS is scoped else they will be *global*


// Use CSS modules in html template by interpolating them
const interpolateTemplate = () => {
  const cssModuleClassNames = Object.keys(styles).join("|");
  const classNamesRegex = new RegExp(cssModuleClassNames, "gi");
  const templateWithClassNames = template.replace(
    classNamesRegex,
    (matched) => styles[matched]
  );
  return templateWithClassNames;
};

const htmlLifecycles = singleSpaHtml({
  domElementGetter: () => {
    const id = "single-spa-application:@actionanand/single-spa-vanilla-js";
    let container = document.getElementById(id);
    if (!container) {
      container = document.createElement("div");
      container.id = id;
      document.body.prepend(container); // single-spa automatically _appends_, but this content should be _prepended_ for accessibility
    }
    return container;
  },
  template: interpolateTemplate(),
});


export const mount = async (props) => {

  await htmlLifecycles.mount(props); // wait for single-spa to mount the application
  
  console.log(props);

  const appDiv = document.querySelector("#vanilla-app-id");

  appDiv.innerHTML = props.name;

};

export const { bootstrap, unmount } = htmlLifecycles; // export other lifecycles as-is
