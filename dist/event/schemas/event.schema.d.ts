export declare class Event {
    title: string;
    description: string;
    genre: string;
    eventStart: string;
    eventEnd: string;
    location: string;
    totalPlace: number;
    bookedPlace: number;
    price: number;
    artist?: string;
    image?: string;
    startTime: string;
    endTime: string;
    userId?: number;
}
export declare const EventSchema: import("mongoose").Schema<Event, import("mongoose").Model<Event, any, any, any, import("mongoose").Document<unknown, any, Event> & Event & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Event, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Event>> & import("mongoose").FlatRecord<Event> & {
    _id: import("mongoose").Types.ObjectId;
}>;
