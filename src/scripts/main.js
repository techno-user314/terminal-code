import { builtInCommands } from "./commands.js";
import { advance } from "./advance.js";

const screen = document.getElementById('screen');
const output = document.getElementById('output');
const cmdline = document.getElementById('cmdline');

const history = [];
let histPos = -1;

// ---- INPUT HANDLING ----
function focusCmd() {
  cmdline.focus();
  const range = document.createRange();
  range.selectNodeContents(cmdline);
  range.collapse(false);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}
screen.addEventListener('click', focusCmd);
focusCmd();

cmdline.addEventListener('keydown', ev => {
  if (ev.key === "Enter" && !ev.shiftKey) {
    ev.preventDefault();
    const text = cmdline.innerText.trim();
    cmdline.innerHTML = "";
    if (text.length) {
      history.push(text);
      histPos = -1;
      appendOutput("$ " + text);
      handleCommand(text);
    } else {
      appendOutput("$");
    }
  }
  if (ev.key === "ArrowUp" || ev.key === "ArrowDown") {
    ev.preventDefault();
    if (!history.length) return;
    if (ev.key === "ArrowUp") {
      histPos = histPos <= 0 ? history.length - 1 : histPos - 1;
    } else {
      histPos = histPos >= history.length - 1 ? 0 : histPos + 1;
    }
    cmdline.innerText = history[histPos];
    focusCmd();
  }
});

// ---- COMMAND REGISTRY ----
const commands = {};

export function registerCommand(name, fn, helpText = "", able = true) {
  commands[name] = { fn, helpText, enabled: able, use_count: 0 };
}

function appendOutput(text) {
  const div = document.createElement('div');
  div.innerHTML = text
    .replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]))
    .replace(/\n/g, "<br>");
  output.appendChild(div);
  screen.scrollTop = screen.scrollHeight;
}

function appendOutputAnimated(text, speed = 25, lineDelay = 150) {
  const lines = String(text).split("\n");

  let lineIndex = 0;

  function typeLine() {
    if (lineIndex >= lines.length) return; // done

    const lineElem = document.createElement("div");
    output.appendChild(lineElem);

    let charIndex = 0;
    function typeChar() {
      if (charIndex < lines[lineIndex].length) {
        lineElem.textContent += lines[lineIndex][charIndex];
        charIndex++;
        screen.scrollTop = screen.scrollHeight;
        setTimeout(typeChar, speed);
      } else {
        // Move to next line after short pause
        lineIndex++;
        if (lineIndex < lines.length) {
          setTimeout(typeLine, lineDelay);
        }
      }
    }
    typeChar();
  }
  typeLine();
}

function handleCommand(cmd) {
  const parts = cmd.split(" ").filter(Boolean);
  const name = parts.shift();
  const args = parts;

  // notify advance.js
  advance.observeCommand(name, args);

  if (commands[name]) {
    if (!commands[name].enabled) {
      appendOutputAnimated(name + " - This is a debug message: command disabled");
      return;
    }
    try {
      const result = commands[name].fn(args);
      if (result !== undefined) appendOutputAnimated(result);
    } catch (e) {
      appendOutputAnimated("Error, see log for details");
      console.log("Error: " + e.message);
    }
  } else {
    appendOutputAnimated(name + ": command not found");
  }
}

// Register basic utility commands
registerCommand("help", () => {
    let out = "Available commands:\n";
    for (const [name, obj] of Object.entries(commands)) {
      if (obj.enabled) {
        out += "  " + name + (obj.helpText ? " — " + obj.helpText : "") + "\n";
      }
    }
    return out;
}, "List all commands");

registerCommand("clear", () => {
  document.getElementById('output').innerHTML = "";
}, "Clear the screen");

registerCommand("exit", () => {
  window.location.reload();
}, "Abandon your post");

// Load commands
builtInCommands(registerCommand);

// ---- UTILITY ----
export function setTip(text) {
  const tip = document.getElementById('tip');
  tip.innerHTML = text
}

// ---- EXPORT ----
export { appendOutput, commands };
