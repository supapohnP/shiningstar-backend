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
    http_status: HttpStatus.UNAUTHORIZED,
    description: 'Can not Register',
  },
  DUPLICATE_EMAIL: {
    error_code: 2001,
    http_status: HttpStatus.PRECONDITION_FAILED,
    dev_description: 'Duplicate Email',
  },

  LOGIN_FAILED: {
    error_code: 3000,
    http_status: HttpStatus.UNAUTHORIZED,
    description: 'Login failed',
  },

  // User
  USER_NOT_FOUND: {
    error_code: 4000,
    http_status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  },

  // Event listing
  EVENT_LISTING_NOT_FOUND: {
    error_code: 5000,
    http_status: HttpStatus.NOT_FOUND,
    description: 'Event listing not found',
  },
  EVENT_LISTING_CAN_NOT_CREATE: {
    error_code: 5001,
    http_status: HttpStatus.BAD_REQUEST,
    description: 'Event listing can not create',
  },
  EVENT_LISTING_CAN_NOT_UPDATE: {
    error_code: 5002,
    http_status: HttpStatus.BAD_REQUEST,
    description: 'Event listing can not update',
  },

  // Seat
  SEAT_NOT_FOUND: {
    error_code: 6000,
    http_status: HttpStatus.NOT_FOUND,
    description: 'Seat not found',
  },
  SEAT_CAN_NOT_CREATE: {
    error_code: 6001,
    http_status: HttpStatus.BAD_REQUEST,
    description: 'Seat can not create',
  },
  SEAT_CAN_NOT_UPDATE: {
    error_code: 6002,
    http_status: HttpStatus.BAD_REQUEST,
    description: 'Seat can not update',
  },
  SEAT_NOT_AVAILABLE: {
    error_code: 6002,
    http_status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Seat not available',
  },

  // Reservation
  RESERVATION_NOT_FOUND: {
    error_code: 7000,
    http_status: HttpStatus.NOT_FOUND,
    description: 'Reservation not found',
  },
  RESERVATION_CAN_NOT_CREATE: {
    error_code: 7001,
    http_status: HttpStatus.BAD_REQUEST,
    description: 'Reservation can not create',
  },
  RESERVATION_CAN_NOT_UPDATE: {
    error_code: 7002,
    http_status: HttpStatus.BAD_REQUEST,
    description: 'Reservation can not update',
  },

} as const;
