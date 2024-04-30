const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);    // Passes 98382 as the rover's position.
let response = rover.receiveMessage(message);

console.log(response);
describe("Rover class", function () {

  it("constructor sets position and default values for mode and generatorWatts", function () {
    let rover = new Rover(98382);

    expect(rover.position).toEqual(98382);

    expect(rover.mode).toEqual("NORMAL");

    expect(rover.generatorWatts).toEqual(110);
  });
  it("response returned by receiveMessage contains the name of the message", function () {
    let message = new Message('Test message', []);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);

    expect(response.message).toEqual('Test message');
  });
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);

    expect(response.results.length).toEqual(2);
  });
  it("responds correctly to the status check command", function () {
    let message = new Message('Test message with status check', [new Command('STATUS_CHECK')]);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);

    expect(response.results[0].roverStatus.mode).toEqual("NORMAL");

    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);

  });
  it("responds correctly to the mode change command", function () {
    let message = new Message('Test message with mode command', [new Command('MODE_CHANGE', 'LOW_POWER')]);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);

    expect(response.results[0].completed).toEqual(true);

    expect(rover.mode).toEqual('LOW_POWER')
  });
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    let message = new Message('Test message with move in LOW_POWER mode', [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 100)]);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);

    expect(response.results[1].completed).toEqual(false);

    expect(rover.position).toEqual(98382);
  });
  it("responds with the position for the move command", function () {
    let message = new Message('Test message with move command', [new Command('MOVE', 100)]);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);

    expect(response.results[0].completed).toEqual(true)

    expect(rover.position).toEqual(100);
  });
});
