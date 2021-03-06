import { Subject_O, Grade_O } from "./subjects";
import { Date_t_F, Date_t_A, firebaseDate, StoredImage } from "./firebaseTypes";
import { Timestamp } from './env.utils'
export interface Note_t {
  title: string;
  uid: string;
  userDisplayName: string;
  userPhotoUrl?: string;

  images?: string[];
  contents?: string;
  storedImages?: StoredImage[];

  createdAt: Date;
  upVotes: number;
  views: number;

  subject: Subject_O;
  grade: Grade_O;
  magicRank ?: number;
  deteriorate?: number
  school ?: string;

  id?: string;
}
export interface Note_t_F {
  // How the data is stored in firebase
  title: string;
  uid: string;
  userDisplayName: string;
  userPhotoUrl?: string;

  images?: string[];
  contents?: string;
  storedImages?: StoredImage[];

  createdAt: Date_t_F;
  upVotes: number;
  subject: Subject_O;
  grade: Grade_O;
  magicRank ?: number;
  school ?: string;
  deteriorate?: number
  views: number;

  updatedAt ?: Timestamp
  private ?: boolean
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type Note_t_A = Omit<Note_t_F, "createdAt"> & {
  createdAt: Date_t_A | Date;
  gradeName: string;
  objectID: string;
};

export class Note {
  constructor(opts: Note_t) {
    return Object.assign(this, opts);
  }

  static fromFirebase = (doc: Note_t_F, id?: string) => {
    const createdAt = firebaseDate(doc.createdAt);
    const obj = { ...doc, createdAt, id };
    return new Note(obj);
  };

  static toFirebase = (note: Note): Note_t_F => {
    const createdAt = Timestamp.fromDate(note.createdAt);
    const { id, ...firebaseDoc } = { ...note };
    return { ...firebaseDoc, createdAt };
  };
  static toAlgolia = (note: Note, objectID: string): Note_t_A => {
    const { id, grade, ...firebaseDoc } = { ...note };
    const gradeName = typeof grade === "number" ? "Grade " + grade : grade;
    return { ...firebaseDoc, objectID, grade, gradeName };
  };
}
export interface Note extends Note_t {}
