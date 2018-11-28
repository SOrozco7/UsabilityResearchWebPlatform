import { User } from './user';
import { Questionnaire } from './questionnaire';
import { Question } from './question';
import { Participant } from './participant';

export class Experiment {
    constructor(
        public name: string,
        public description: string,
        public startDate: Date,
        public endDate: Date,
        public user_id: string,
        public questionnaires: Questionnaire[],
        public questionsCount: number,
        public participantsCount: number,
        public questions?: Question[],
        public participants?: Participant[],
        public updatedAt?: Date,
        public createdAt?: Date,
        public id?: number
    ) { }
}
