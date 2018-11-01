import { QuestionnaireQuestion } from './questionnaire-question';

export class Questionnaire {
    constructor(
        public name: string,
        public description: string,
        public isPublic: boolean,
        public scaleSize: number,
        public questions?: QuestionnaireQuestion[],
        public user_id?: string,

        public updatedAt?: Date,
        public createdAt?: Date,
        public id?: number
    ) { }
}
