import { Experiment } from "./experiment";

export class User {
    constructor(

        public firstName: string,
        public lastName: string,
        public password: string,
        public username: string,
        public id: string,
        public createdAt: Date,
        public updatedAt: Date,
        public experiments?: Experiment[]
    ) { }
}