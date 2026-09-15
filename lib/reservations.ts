import { ObjectId } from "mongodb";

export type ReservationDocument = {
  _id: ObjectId;
  eventId: string; // Stored as string for simpler querying, or ObjectId if preferred
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  seats: number;
  createdAt: Date;
};

export function serializeReservation(res: ReservationDocument) {
  return {
    ...res,
    _id: res._id.toString(),
    createdAt: res.createdAt.toISOString()
  };
}
