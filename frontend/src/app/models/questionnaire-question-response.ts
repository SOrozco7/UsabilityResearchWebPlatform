import { QuestionnaireQuestion } from './questionnaire-question';
import { QuestionnaireResponse } from './questionnaire-response';

export class QuestionnaireQuestionResponse {
    constructor(
        public responseValue: number,
        public QuestionnaireResponseId: number,  // tslint:disable-line:variable-name
        public QuestionnaireQuestionId: number,  // tslint:disable-line:variable-name

        public updatedAt?: Date,
        public createdAt?: Date,
        public id?: number
    ) { }
}
