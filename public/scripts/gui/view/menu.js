import {change} from "../viewModel.js"

const elements = {
  button : document.getElementById("change")
}

const execute = () => {
  change()
}

export const initialize = () => {
  elements.button.onclick = execute
}
