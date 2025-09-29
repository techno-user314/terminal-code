function builtInCommands(register) {
  //registerCommand parameters: name, function, help text, enabled (boolean)
  
  register("echo", args => {
    return args.join(" ");
  }, "Print text to the screen", false);
  
  register("begin", args => {
    return "Hello.\nWelcome.\nThank you for joining us on our journey.";
  }, "???", false);
  
  // Register more commands here
}

export { builtInCommands };
