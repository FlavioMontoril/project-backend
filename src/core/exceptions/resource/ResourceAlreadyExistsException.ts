import { AppException } from "../AppException.js";

export class ResourceAlreadyExistsException extends AppException {
  constructor() {
    super(
      409,
      "Resource already exists"
    );
  }
}
