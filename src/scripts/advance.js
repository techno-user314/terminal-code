import { commands, setTip } from "./main.js";

const advance = {
  observeCommand(name, args) {
    if (name === "help") {
      commands["echo"].enabled = true;
      setTip("Say 'hi'")
    }
  }
};

export { advance };

