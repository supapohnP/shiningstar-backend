import { HttpStatus } from "@nestjs/common";

export interface ErrorCodeObj {
  error_code: number;
  http_status: number;
  description: string;
}

export const ERROR_CODE = {
  // Auth
  REGISTER_FAILED: {
    error_code: 2000,
    http_status: HttpStatus.BAD_REQUEST,
    description: 'Can not Register, Email already exists',
  },

  LOGIN_FAILED: {
    error_code: 3000,
    http_status: HttpStatus.BAD_REQUEST,
    description: 'Login failed',
  },

  // User
  USER_NOT_FOUND: {
    error_code: 4000,
    http_status: HttpStatus.BAD_REQUEST,
    description: 'User not found',
  },

  // Event-listing

  // Seat

  // Reservation

} as const;
