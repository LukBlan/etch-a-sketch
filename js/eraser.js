(function eraser() {
  // Cache DOM
  const eraser = document.querySelector(".eraser");

  eraser.addEventListener("mouseup", toggleEraser);

  pubSub.subscribe("removeEraser", removeEraser)

  function toggleEraser() {
    if (eraser.className.includes("active")) {
      eraser.classList.remove("active")
      pubSub.emit("activeColorPicker", null);
    } else {
      eraser.classList.add("active")
      pubSub.emit("removeColorPicker",null);
      pubSub.emit("removeRainbowColor",null);
      pubSub.emit("newOptionSelected", eraseCell);
      pubSub.emit("changeCursorIcon", "eraser-cursor");
    }
  }

  function removeEraser() {
    eraser.classList.remove("active")
  }


  function eraseCell() {
    return "white"
  }
})()