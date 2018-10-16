import { Experiment } from './experiment';

export class BodyPart {
    constructor(
        public id?: number,
        public BodyParts?: string[],  // tslint:disable-line:variable-name
        public experiment_id?: number
    ) { }
}
