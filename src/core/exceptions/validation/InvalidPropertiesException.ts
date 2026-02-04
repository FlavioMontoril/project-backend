import { AppException } from "../AppException.js";

export class InvalidPropertiesException extends AppException {
  constructor() {
    super(
      422,
      "Invalid properties"
    );
  }
}
