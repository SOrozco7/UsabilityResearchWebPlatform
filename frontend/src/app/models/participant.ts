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
        public questionResponses?: QuestionResponse[]
    ) { }
}
