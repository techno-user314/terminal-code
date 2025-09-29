import { commands, setTip } from "./main.js";

let advancementNum = 0;
let granted = [false, false]
let messageNumber = -1;

const advance = {
  observeCommand(cmd, args) {
    console.log("User ordered: ", advancementNum, cmd, args);
    
    // Check for filled advancement requirements:
    if (cmd in commands) {
      commands[cmd].use_count += 1;
    }
    if (commands["echo"].use_count === 1 && !granted[0]) {
      granted[0] = true;
      alert("Achievment Unlocked: You're learning...");
    }
    if (commands["clear"].use_count === 10 && !granted[1]) {
      granted[1] = true;
      alert("Achievment Unlocked: Janitor\n\nYou used the 'clear' command 10 times");
    }
    
    // Main game progression tree
    switch (advancementNum) {
      case 0:
        if (cmd === "help") {
          commands["echo"].enabled = true;
          setTip("Now, say 'Hello World!'");
          advancementNum += 1;
        }
        break;
        
      case 1:
        if (cmd === "echo" && JSON.stringify(args) === JSON.stringify(["Hello", "World!"])) {
          setTip("Cleanup time!");
          advancementNum += 1;
        }
        break;
        
      case 2:
        if (cmd === "clear") {
          setTip("");
          advancementNum += 1;
        }
        break;
    
      case 3:
        if (cmd === "help") {
          commands["msg"].enabled = true;
          messageNumber = 0;
          advancementNum += 1;
        }
        break;
        
      case 4:
        if (cmd === "msg") {
          advancementNum += 1;
        }
        break;
      case 5:
        messageNumber = -1;
        advancementNum += 1;
        break;
        
      default:
        break;
    }
  }
};

export { advance, messageNumber };
