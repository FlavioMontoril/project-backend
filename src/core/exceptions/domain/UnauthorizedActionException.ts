import { AppException } from "../AppException.js";

export class UnauthorizedActionException extends AppException {
  constructor() {
    super(
      403,
      "Unauthorized action"
    );
  }
}
