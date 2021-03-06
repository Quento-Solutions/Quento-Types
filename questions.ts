import {Date_t_F, Date_t_A, firebaseDate, algoliaDate, StoredImage} from './firebaseTypes';
import type {Keyword_O, Subject_O , Grade_O} from './subjects'
import { Timestamp } from './env.utils'

export interface Question_t
{
    id ?: string;
    createdAt : Date;

    title : string;
    contents : string;
    keywords ?: Keyword_O[];
    subject : Subject_O;
    grade : Grade_O;
    school ?: string;
    storedImages ?: StoredImage[];
    
    upVotes : number;
    views : number;
    responses : number;
    
    userPhotoUrl ?: string;
    userId : string;
    userDisplayName : string;
}


export interface Question_t_F
{
    createdAt : Date_t_F;
    
    title : string;
    contents : string;
    subject : Subject_O;
    grade : Grade_O;
    
    upVotes : number;
    views : number;
    responses : number;
    keywords ?: Keyword_O[]
    storedImages ?: StoredImage[];
    
    userPhotoUrl ?: string;
    userId : string;
    userDisplayName : string;
    school ?: string;
    updatedAt ?: Timestamp
    deteriorate?: number
    magicRank ? : number;

    private ?: boolean
}
export type Question_t_A = Omit<Question_t_F, "createdAt"> &
{
    createdAt : Date_t_A | Date;
    gradeName : string
    objectID : string;
}

export class Question
{

    constructor(
        opts : Question_t
    ){
        return Object.assign(this, opts)
    }

    static fromFirebase = (doc : Question_t_F, id ?: string) =>
    {

        const obj = {...doc, createdAt : firebaseDate(doc.createdAt), id};
        return new Question(obj)
    }
    static fromAlgolia = (doc : Question_t_A) =>
    {
        const {objectID, ...obj} = {...doc, createdAt : algoliaDate(doc.createdAt as Date_t_A), id : doc.objectID};
        return new Question(obj)
    }

    static toFirebase(question : Question) : Question_t_F
    {
        const createdAt = Timestamp.fromDate(question.createdAt);
        const {id, ...firebaseDoc} = {...question}
        return {...firebaseDoc, createdAt}
    }
    static toAlgolia = (note : Question, objectID : string) : Question_t_A =>
    {
        const {id, grade, ...firebaseDoc} = {...note}
        const gradeName = typeof grade === "number" ? "Grade " + grade : grade;
        return {...firebaseDoc, objectID, grade, gradeName }
    }
}
export interface Question extends Question_t {}
