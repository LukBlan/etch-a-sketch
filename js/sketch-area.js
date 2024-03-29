(function sketchArea() {
  // Cache DOM
  const sketchArea = document.querySelector(".sketch-area");
  let currentCursorIcon = "pen-cursor";
  let currenFunctionColor = () => {return "black"};
  let gridEnabled = false;

  // Bind Events
  sketchArea.addEventListener("mousedown", (event) => {
    applyColorToCellOnGrid()
    renderColorOnCell(event)
  });

  // Subscribe Events
  pubSub.subscribe("newGridSize", renderGrid);
  pubSub.subscribe("newOptionSelected", setFunctionOption);
  pubSub.subscribe("bomb", bombSketchArea);
  pubSub.subscribe("changeCursorIcon", changeCursorIcon);
  pubSub.subscribe("toggleGrid", toggleGrid);

  function toggleGrid() {
    const allElements = getAllChild();
    if (gridEnabled) {
      gridEnabled = false;
      allElements.forEach(innerDiv => innerDiv.classList.remove("show-grid"));
    } else {
      allElements.forEach(innerDiv => innerDiv.classList.add("show-grid"));
      gridEnabled = true;
    }
  }

  function changeCursorIcon(newCursorIcon) {
    sketchArea.classList.remove(currentCursorIcon);
    sketchArea.classList.add(newCursorIcon);
    currentCursorIcon = newCursorIcon;
  }

  function bombSketchArea() {
    const allElements = getAllChild();
    allElements.forEach(element => element.removeAttribute("style"));
  }

  function getAllChild() {
    return Array.from(sketchArea.children).map(div => Array.from(div.children)).flat();
  }

  function setFunctionOption(newFunctionColor) {
    currenFunctionColor = newFunctionColor;
  }

  function applyColorToCellOnGrid() {
    sketchArea.addEventListener("mousemove", renderColorOnCell)
    sketchArea.addEventListener("mouseup", () => {sketchArea.removeEventListener("mousemove", renderColorOnCell)});
  }

  function renderColorOnCell(event) {
    if (event.target.nodeName === "DIV") {
      event.target.style.backgroundColor = currenFunctionColor();
    }
  }

  function renderGrid(gridSize) {
    sketchArea.innerHTML = ""
    createDivs(gridSize)
  }

  function createDivs(gridSize) {
    for (let i = 0; i < gridSize; i++) {
      let newDiv = document.createElement("div");
      for (let j = 0; j < gridSize; j++) {
        let innerDiv = document.createElement("div");
        if (gridEnabled) {
          innerDiv.classList.add("show-grid");
        }
        newDiv.append(innerDiv);
      }
      sketchArea.append(newDiv);
    }
  }

  renderGrid(48);
})()