# Robot Challenge

A simple CLI app to move a toy robot around a tabletop as a coding exercise.

Built with Node, TypeScript, Jest, ESLint, Prettier.

## Getting started

Skip this section if you have Node Version Manager (nvm) and yarn installed.

Install [nvm](https://github.com/nvm-sh/nvm#install--update-script):

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
```

Install yarn through [Homebrew](https://brew.sh/):

```sh
brew install yarn
```

## How to use

First, install and use the correct node version and install dependencies:

```sh
nvm install
nvm use
yarn install
```

### Scripts

#### `yarn run start`

Starts the app in production by first building the project with `yarn run build`, and then executing the compiled JavaScript at `build/index.js`.

#### `yarn run build`

Builds the app at `build`, cleaning the folder first.

#### `yarn run dev`

Starts the application in development using `nodemon` and `ts-node` to do hot reloading.

#### `yarn run lint`

Lint TypeScript code using ESLint.

#### `yarn run lint:fix`

Lint TypeScript code using ESLint and attempt to fix linting errors.

#### `yarn run format`

Format code using Prettier.

#### `yarn run test`

Runs the jest tests.

#### `yarn run test:dev`

Run the jest tests in watch mode - re-runs tests after file changes.

## My comments and thoughts

The app is in decent state and reflects how I code in a professional environment.
That said, I stopped before spending too much time on it.

If continuing to work on the app, I’d like to work on the following:

1. Add pre-commit hooks for testing and linting code. (I tried to implement this using [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged) but the latest version of husky wasn’t working and so I decided to bench it for the moment.)
2. Add a code coverage threshold and write additional tests to meet those thresholds
3. Some form of E2E testing
4. Dockerize and implement basic CI/CD
5. A cleaner directory structure (e.g. better file structure for terminal messages)

### Why did you code it like that?

To keep the code as readable as possible for the reviewer, I’ve intentionally avoided using additional packages to prettify the terminal output (like [chalk](https://github.com/chalk/chalk)) or helpful utility libraries that simplify writing CLI interfaces (like [inquirer](https://github.com/SBoudrias/Inquirer.js/) and [commander](https://github.com/tj/commander.js)).
I’d utilise these libraries if building an actual CLI app.

I find functionally programmed code easier to understand and maintain over object oriented programming and so I’ve avoided side-effects and mutations as much as possible.
Drawing a bit from react & redux, I've implement a semi-action/dispatch/state reducer pattern to avoid directly mutating states.

Commit messages follow the [conventional commits spec](https://www.conventionalcommits.org/en/v1.0.0/#specification) for better readability.

### Potential features

Some additional feature opportunities:

1. User can save data (robot coordinates, direction and tabletop dimensions) in a file and the option to load state from the file
2. User can execute commands from a file instead of via terminal input
3. User can modify tabletop dimensions (the moveRobot function can already handle varying tabletop dimensions, but the the option is not exposed to the user in the terminal)
4. User can modify the number of steps taken in one MOVE command
5. User can move robot diagonally (e.g. "NORTHEAST", "SOUTHWEST")
6. Users can add multiple robots on the tabletop (including logic preventing collisions)
7. Users receive more helpful & intelligent error messages (e.g. if a command would move a robot off the tabletop, give the user the option to ignore the command or to move the robot to the edge of the tabletop instead.)

## Description

- The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units.
- There are no other obstructions on the table surface.
- The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement
  that would result in the robot falling from the table must be prevented, however further valid movement commands must still
  be allowed.

Create an application that can read in commands of the following form:

```plain
PLACE X,Y,F
MOVE
LEFT
RIGHT
REPORT
```

- PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.
- The origin (0,0) can be considered to be the SOUTH WEST most corner.
- The first valid command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command. The application should discard all commands in the sequence until a valid PLACE command has been executed.
- MOVE will move the toy robot one unit forward in the direction it is currently facing.
- LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
- REPORT will announce the X,Y and orientation of the robot.
- A robot that is not on the table can choose to ignore the MOVE, LEFT, RIGHT and REPORT commands.
- Provide test data to exercise the application.

## Constraints

The toy robot must not fall off the table during movement. This also includes the initial placement of the toy robot.
Any move that would cause the robot to fall must be ignored.

Example Input and Output:

```plain
PLACE 0,0,NORTH
MOVE
REPORT
Output: 0,1,NORTH
```

```plain
PLACE 0,0,NORTH
LEFT
REPORT
Output: 0,0,WEST
```

```plain
PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT
Output: 3,3,NORTH
```

## Deliverables

The source files, the test data and any test code (as well as explanations of how to run everything).

## Expectations

- There is no time limit for the test, you can take as long as you like, but a reasonable thing that most people do is to take a weekend to do it and send the solution back (i.e. turn it around within a week). If you need more time that's fine, just send us a quick message to let us know.
- You're welcome to use whatever language you like, our tech stack is Ruby and Typescript so either one of those would be well regarded, but if you want to use a different language you're welcome to, just make sure we can easily run it (e.g. docker image). It's also worthwhile to make sure that the language you pick (if something other than Ruby or TS) is the best way to showcase your skills. Remember you will be pairing and extending this solution if you get to that part of the interview process.
- The expectation is that you will create a command line application, please don't build a web ui/api etc.
- You will use this coding test as a showcase of your skills as a developer, we should be able to look at this code and learn something about the way you think and about how you solve problems.

We're not just looking for a minimal solution that would solve the problem. We're looking for:

- production quality code
- good OO and/or functional practices
- a solid testing approach
- well thought out naming
- solid error handling
- extensibility/maintainability/\*ility
- good design from a software engineering perspective
- separation of concerns, i.e. low coupling high cohesion
- sensible breakdown of code into files/modules
- use of best practices/idioms when it comes to language, testing etc.
- appropriate use of tools/frameworks
- performant code, i.e. memory/cpu efficient
- etc

Basically treat the coding test as if it's a larger problem, a little bit of over-engineering is likely a good idea.

## Common issues to avoid/think about

- edge case inputs break the application
- a large amount of input data will kill the application/cause it to be slow/cause it to be unresponsive
- it requires a lot of effort to add new commands to the application
- it requires a lot of effort to change the dimensions of the table
- the application is not resilient to changes in the format of the input
- the application is not resilient to changes in the source of the input
- the application is not resilient to changes in the format of the output
- elements of the design clearly violate SOLID (if OO)
- the solution doesn't invert any dependencies
- the solution violates DRY

## Self-assessment checklist

- Does the submission exhibit a good understand of OO and/or functional priniciples
- Does the submission exhibit a solid testing approach (good mix of unit and integration tests etc.)
- Does the submission exhibit well thought out variable/function/class naming
- Does the submission exhibit a solid approach to error handling (can't easily get a stack trace on the command line)
- Does the submission exhibit low coupling/high cohesion
- Is the code easy to read/understand/extend
- Would I be happy to have code of a similar standard in production
- Would I be happy to inherit/modify/extend/maintain code of a similar standard
