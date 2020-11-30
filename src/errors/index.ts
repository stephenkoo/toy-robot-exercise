class ApplicationError extends Error {
  constructor(message: string) {
    super(message);
  }

  get name() {
    return this.constructor.name;
  }
}

export class UserFacingError extends ApplicationError {}

export const RobotNotOnTabletopError = new UserFacingError(
  "Robot must first be placed on tabletop."
);

export const ErrorHandler = (err: Error): void => {
  if (err instanceof UserFacingError) {
    console.error(err.message);
  }

  console.error(`${err.name}: ${err.message}`);
};
