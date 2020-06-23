import * as view from "./view.js"

export const initialize = () => {
  view.film.initialize()
  view.menu.initialize()
}

export const change = () => {
  const newText = ["compressed flow", "power unit", "rome", "map", "python"]
  const newLayersMap = new Map([
    ["layer5", {text: newText, speed: 0.2}],
    ["layer6", {imageURL: "./scripts/gui/view/images/forest2.jpg"}],
  ])
  view.film.change(newLayersMap)
}
