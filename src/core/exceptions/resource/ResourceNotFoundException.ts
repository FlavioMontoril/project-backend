import { AppException } from "../AppException.js";

export class ResourceNotFoundException extends AppException {
  constructor() {
    super(
      404,
      "Resource not found"
    );
  }
}
