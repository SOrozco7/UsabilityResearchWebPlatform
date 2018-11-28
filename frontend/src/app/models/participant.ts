import { QuestionResponse } from './question-response';

export class Participant {
    constructor(

        public name: string,
        public age: number,
        public gender: string,
        public ethnicGroup: string,
        public educationLevel: string,
        public experiment_id: number,
        public updatedAt?: Date,
        public createdAt?: Date,
        public id?: number,
        public questionresponses?: QuestionResponse[]
    ) { }

    public sortQuestionResponsesArray() {

        this.questionresponses.sort((qr1, qr2) => {

            if (qr1.question_id > qr2.question_id) {
                return 1;
            } else if (qr1.question_id < qr2.question_id) {
                return -1;
                 }

            return 0;
        });
    }
}
