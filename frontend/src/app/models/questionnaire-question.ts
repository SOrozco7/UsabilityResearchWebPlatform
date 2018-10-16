export class QuestionnaireQuestion {
    constructor(
        public text: string,
        public questionnaire_id?: number,

        public updatedAt?: Date,
        public createdAt?: Date,
        public id?: number
    ) { }
}
