function builtInCommands(register) {
  //registerCommand parameters: name, function, help text, enabled (boolean)
  
  register("echo", args => {
    return args.join(" ");
  }, "Print text to the screen");
  
  // Register more commands here
}

export { builtInCommands };
