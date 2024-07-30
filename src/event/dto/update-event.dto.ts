export class UpdateEventDto {
  readonly title: string;
  readonly description: string;
  readonly genre: string;
  readonly eventStart: string;
  readonly eventEnd: string;
  readonly location: string;
  readonly totalPlace: number;
  readonly availablePlace: number;
  readonly price: number;
  readonly artist: string;
  readonly image: string;
  readonly userId: number;
}
