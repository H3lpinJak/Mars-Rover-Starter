class Rover {
  // Write code here!
  constructor(position) {

    if (typeof position !== 'number') {
      throw Error("Position must be a number.");
    }
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }
  receiveMessage(message) {
    let results = [];
    console.log('Message Type:', message.name)
    for (let command of message.commands) {
      console.log('Command Type:', command.commandType)
      if (command.commandType === 'MODE_CHANGE') {
        this.mode = command.value;
        results.push({ completed: true });
      } else if (command.commandType === 'STATUS_CHECK') {
        results.push({
          completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position
          }
        })
      } else if (command.commandType === 'MOVE') {
        if(this.mode === 'LOW_POWER') {
          results.push({ completed: false });
        } else {
          this.position = command.value;
          results.push({ completed: true });
        }
      }
    }
    console.log('Results', results);
    return { message: message.name, results: results };
  }
}

module.exports = Rover;
