import { Experiment } from "./experiment";

export class BodyPart {
    constructor(
        public id?: number,
        public BodyParts?: string[],
        public experiment_id?: number
    ) { }
}