import { Experiment } from './experiment';

export class BodyPart {
    constructor(
        public id?: number,
        public bodyParts?: string[],
        public experiment_id?: number
    ) { }
}
