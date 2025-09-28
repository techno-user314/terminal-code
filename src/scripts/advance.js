import { commands, setTip } from "./main.js";

let advancementNum = 0;

const advance = {
  observeCommand(cmd, args) {
    console.log("User ordered: ", advancementNum, cmd, args);
    
    // Check for filled advancement requirements:
    if (commands["echo"].use_count > 0) {
        alert("Achievment Unlocked: You're learning...");
    }
    if (commands["clear"].use_count > 10) {
        alert("Achievment Unlocked: Janitor\n\nYou used the 'clear' command over 10 times");
    }
    
    // Main game progression tree
    advancementNum += 1;
    switch (advancementNum) {
      case 1:
        if (cmd === "help") {
          commands["echo"].enabled = true;
          setTip("Now, say 'Hello World!'");
        }
        break;
        
      case 2:
        if (cmd === "echo") {
          setTip("Cleanup time!");
        }
        break;
        
      case 3:
        if (cmd === "clear") {
          setTip("");
        }
        break;
      
      default:
        advancementNum -= 1;
        break;
    }
  }
};

export { advance };
