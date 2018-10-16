import { QuestionnaireQuestion } from "./questionnaire-question";

export class Questionnaire {
    constructor(
        public name: string,
        public description: string,
        public isPublic: boolean,
        public questions?: QuestionnaireQuestion[],
        public user_id?: number,

        public updatedAt?: Date,
        public createdAt?: Date,
        public id?: number
    ) { }
}
