export class CreateEventListingDTO {
  name: string;
  description: string;
  type: string;
  ticket_sale_at: Date;
  event_at: Date;
  total_seat: number;
}

export class EditEventListingDTO {
  name: string;
  description: string;
  type: string;
  ticket_sale_at: Date;
  event_at: Date;
  total_seat: number;
}
