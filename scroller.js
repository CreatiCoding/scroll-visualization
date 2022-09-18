const createDiv = (callback) => {
  const div = document.createElement("div");

  if (callback != null) callback(div);

  return div;
};

function prerpareContainer(selector) {
  const container = document.querySelector(selector);

  const views = [...container.children];
  views.forEach((x) => (x.style.display = "none"));

  const viewContainer = createDiv((x) => {
    x.style.display = "inline-block";
    x.style.position = "fixed";
    x.style.top = "0px";
    x.style.zIndex = "1";
    x.style.margin = "0";
    x.style.height = "1000px";
    x.style.width = "100%";
    x.append(...views);
  });

  const sections = new Array(views.length)
    .fill(0)
    .map(() => createDiv((x) => (x.style.height = "1000px")));

  container.innerHTML = "";

  container.append(...sections);
  container.append(viewContainer);

  return {
    sections,
    views,
  };
}

function calcSectionPositions(sections) {
  const startPos = sections[0].getBoundingClientRect().top;
  const sectionPositions = [];

  for (const section of sections) {
    const top = section.getBoundingClientRect().top;

    sectionPositions.push(top - startPos);
  }

  return sectionPositions;
}

function activate(views, index) {
  for (let i = 0; i < views.length; i++) {
    if (i === index) {
      views[i].style.display = "block";
    } else {
      views[i].style.display = "none";
    }
  }
}

function calcCurrentIndex(sections, views, sectionPositions, currentIndex) {
  const pos = window.pageYOffset - 300;

  // 2. 아래 내용 따라 구현하기 start
  const index = Math.min(sections.length - 1, bisect(sectionPositions, pos));

  if (currentIndex !== index) {
    activate(views, index);
    return index;
  }
}

function bisect(arr, val) {
  if (arr.length === 0) {
    return 0;
  }

  if (val > arr[arr.length - 1]) {
    return arr.length - 1;
  }

  for (let idx = 0; idx < arr.length; idx++) {
    if (val < arr[idx]) {
      return idx;
    }
  }

  return 0;
}

export function scroller(containerSelector) {
  const { sections, views } = prerpareContainer(containerSelector);

  let currentIndex = -1;
  let sectionPositions = [];

  const onScroll = () => {
    currentIndex = calcCurrentIndex(
      sections,
      views,
      sectionPositions,
      currentIndex
    );
  };

  const onResize = () => {
    sectionPositions = calcSectionPositions(sections);
  };

  return {
    run: () => {
      window.addEventListener("scroll", onScroll);
      window.addEventListener("resize", onResize);

      onScroll();
      onResize();
    },
  };
}
