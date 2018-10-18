import { QuestionnaireQuestion } from './questionnaire-question';

export class QuestionnaireResponse {
    constructor(
        public participant_id: number,
        public questions?: QuestionnaireQuestion[],
        public questionnaire_id?: number,

        public updatedAt?: Date,
        public createdAt?: Date,
        public id?: number
    ) { }
}
