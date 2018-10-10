import { User } from "./user";
import { Questionnaire } from "./questionnaire";

export class Experiment {
    constructor(
        public name: string,
        public description: string,
        public startDate: Date,
        public endDate: Date,
        public user_id: string,
        public questionnaires: Questionnaire[],
        
        public updatedAt?: Date,
        public createdAt?: Date,
        public id?: number
    ) { }
}