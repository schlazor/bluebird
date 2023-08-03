logoReplaced = false

function replaceLogo () {
  svgSelector = "#layers + div header div:first-child div:first-child div:first-child div:first-child div:first-child div:first-child svg";
  path = document.querySelector(svgSelector + " path");
  if (path != null) {
    path.setAttribute("d", "m 221.95,51.29 c 0.15,2.17 0.15,4.34 0.15,6.53 0,66.73 -50.8,143.69 -143.69,143.69 v -0.04 C 50.97,201.51 24.1,193.65 1,178.83 c 3.99,0.48 8,0.72 12.02,0.73 22.74,0.02 44.83,-7.61 62.72,-21.66 -21.61,-0.41 -40.56,-14.5 -47.18,-35.07 7.57,1.46 15.37,1.16 22.8,-0.87 C 27.8,117.2 10.85,96.5 10.85,72.46 c 0,-0.22 0,-0.43 0,-0.64 7.02,3.91 14.88,6.08 22.92,6.32 C 11.58,63.31 4.74,33.79 18.14,10.71 c 25.64,31.55 63.47,50.73 104.08,52.76 -4.07,-17.54 1.49,-35.92 14.61,-48.25 20.34,-19.12 52.33,-18.14 71.45,2.19 11.31,-2.23 22.15,-6.38 32.07,-12.26 -3.77,11.69 -11.66,21.62 -22.2,27.93 10.01,-1.18 19.79,-3.86 29,-7.95 -6.78,10.16 -15.32,19.01 -25.2,26.16 z");
    svg = document.querySelector(svgSelector);
    svg.setAttribute("viewBox", "0 0 222 222");
    logoReplaced = true;
  }
}

function replaceFavicon () {
  favicon = document.querySelector("head > link[rel = \"shortcut icon\"]");
  if (favicon != null && favicon.getAttribute("href") == "https://abs.twimg.com/favicons/twitter-pip.3.ico") {
    favicon.setAttribute("href", "https://abs.twimg.com/favicons/twitter-pip.ico");
  } else {
    favicon.setAttribute("href", "https://abs.twimg.com/favicons/twitter.ico");
  }
}

replaceFavicon();

function updateTitle () {
  if (document.title.endsWith("X")) {
    document.title = document.title.substring(0, document.title.lastIndexOf("X")) + "Twitter";
  }
}

function postToTweet(target) {
  if ( target != null && target.innerText == "Post" ) {
    target.innerText = "Tweet";
  }
}

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    const colorScheme = e.matches ? "dark" : "light";
    replaceFavicon();
  });

const config = { attributes: true, childList: false, subtree: false };
const targetNode = document.querySelector("head > link[rel = \"shortcut icon\"]");
const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "attributes") {
      if (targetNode.getAttribute("href").endsWith("3.ico")) {
        replaceFavicon();
      }
    }
  }
};
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);

const reactRoot = document.querySelector("#react-root");
const reactConfig = { attributes: false, childList: true, subtree: true };
const reactCallback = (reactMutationList, reactObserver) => {
  if (!logoReplaced) {
    svgSelector = "#layers + div header div:first-child div:first-child div:first-child div:first-child div:first-child div:first-child svg";
    path = document.querySelector(svgSelector + " path");
    if(path != null) {
      replaceLogo();
      reactObserver.disconnect();
    }
  }
};
const reactObserver = new MutationObserver(reactCallback);
reactObserver.observe(reactRoot, reactConfig);

const titleConfig = { subtree: true, characterData: true, childList: true }
const titleCallback = (titleMutationList, titleObserver) => {
  if (document.querySelector('title') != null) {
    updateTitle();
  }
};
const titleObserver = new MutationObserver(titleCallback);

function checkTitle() {
  if (document.querySelector('title') != null) {
    updateTitle();
    titleObserver.observe(document.querySelector('title'), titleConfig);
    clearInterval(titleInterval);
  }
}
titleInterval = setInterval(checkTitle, 1000)

postBtnSelector = "span.r-1inkyih:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1) > span:nth-child(1)";
const postBtnConfig = { characterData: true, childList: true };
const postBtnCallback = (postMutationList, postObserver) => {
  postToTweet(document.querySelector(postBtnSelector));
};
const postBtnObserver = new MutationObserver(postBtnCallback);
function checkPostBtn() {
  postBtn = document.querySelector(postBtnSelector);
  if (postBtn != null) {
    postToTweet(postBtn);
    postBtnObserver.observe(postBtn, postBtnConfig);
    clearInterval(postBtnInterval);
  }
}
postBtnInterval = setInterval(checkPostBtn, 1000)

threadBtnSelector = "div.r-l5o3uw:nth-child(4) > div:nth-child(1) > span:nth-child(1) > span:nth-child(1)";
const threadBtnConfig = { characterData: true, childList: true };
const threadBtnCallback = (postMutationList, postObserver) => {
  postToTweet(document.querySelector(threadBtnSelector));
};
const threadBtnObserver = new MutationObserver(threadBtnCallback);
function checkThreadBtn() {
  threadBtn = document.querySelector(threadBtnSelector);
  if (threadBtn != null) {
    postToTweet(threadBtn);
    threadBtnObserver.observe(threadBtn, threadBtnConfig);
  }
}
threadBtnInterval = setInterval(checkThreadBtn, 1000)
