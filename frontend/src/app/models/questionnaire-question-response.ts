import { QuestionnaireQuestion } from './questionnaire-question';
import { QuestionnaireResponse } from './questionnaire-response';

export class QuestionnaireQuestionResponse {
    constructor(
        public responseValue: number,
        public QuestionnaireResponseId: number,
        public QuestionnaireQuestionId: number,

        public updatedAt?: Date,
        public createdAt?: Date,
        public id?: number
    ) { }
}
