import { AppException } from "../AppException.js";

export class InvalidArgumentsException extends AppException {
  constructor() {
    super(
      400,
      "Invalid arguments"
    );
  }
}
