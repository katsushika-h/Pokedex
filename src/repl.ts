import { State } from './state.js';

export function cleanInput(input: string): string[] {
  const output = input.toLowerCase()
    .trim()
    .split(/\s+/)
  return output
}

export async function startREPL(state: State) {

  console.log("Starting prompt")
  state.rl.prompt();

  state.rl.on('line', async (callback) => {
    if (!callback){
      state.rl.prompt();
      return;
    };

    //cleans up user input
    const input = cleanInput(callback);
    const commandName = input[0];
    const args = input.slice(1);
    const cmd = state.commands[commandName];
    
    if (!cmd) {
      console.log(`Unknown command: ${commandName}. Type 'help' to see the list of available commands.`);
      state.rl.prompt();
      return;
    }

    // Execute the command
    try {
      await cmd.callback(state, ...args);
    } catch (error) {
      console.error(`Error executing command '${commandName}':`, error);
    }
    state.rl.prompt();

  });
}
