import { CourseType } from "./CourseType";
import { CourseCategory } from "./CourseCategory";
import { Documentt } from "./Document";
export class Course{
    courseID!: string;
    courseCat!: CourseCategory;
    title!: string;
    //userC!:User;
    courseDate!:Date;
    duration!:number;
    disponibility!:number;
    courseType!:CourseType;
    imageData!: string;
    documentts: Documentt[]=[];
}