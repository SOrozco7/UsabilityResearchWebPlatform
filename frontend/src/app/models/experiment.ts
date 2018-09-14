import { User } from "./user";

export class Experiment {
    constructor(
        public name: string,
        public description: string,
        public startDateTime: Date,
        public endDateTime: Date,
        public user_id: string,
        
        public updatedAt?: Date,
        public createdAt?: Date,
        public id?: number
    ) { }
}