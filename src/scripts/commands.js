import { messageNumber } from "./advance.js";

function builtInCommands(register) {
  //registerCommand parameters: name, function, help text, enabled (boolean)
  
  register("echo", args => {
    return args.join(" ");
  }, "Print text to the screen", false);
  
  register("msg", async args => {
    if (messageNumber === -1) {
      return "No new messages"
    }
    try {
      const filePath = `../data/msg${messageNumber}.txt`;
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        return "Message could not be read";
      }
      const textLiteral = await response.text();
      return textLiteral;
    } catch (error) {
      return "Message could not be read";
    }
  }, "Show any new messages", false);
  
  // Register more commands here
}

export { builtInCommands };
