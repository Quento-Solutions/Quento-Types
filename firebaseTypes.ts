import { Timestamp } from "./env.utils";

export type Date_t_F =  Timestamp;

export interface Date_t_A
{
    _seconds : number;
    _nanoseconds : number
}
export interface StoredImage
{
    fileName : string;
    imageURL : string;
}
export const firebaseDate = (date : Date_t_F) => date ? new Date(date.seconds * 1000) : new Date(0);
export const algoliaDate = (date : Date_t_A) => new Date(date._seconds * 1000);
