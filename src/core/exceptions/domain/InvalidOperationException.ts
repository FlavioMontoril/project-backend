import { AppException } from "../AppException.js";

export class InvalidOperationException extends AppException {
  constructor() {
    super(
      409,
      "You cannot trigger this operation for this task."
    );
  }
}
