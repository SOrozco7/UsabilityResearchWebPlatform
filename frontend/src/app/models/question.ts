export class Question {
    constructor(
       public id: number,
       public experiment_id: number,
       public text: String,
       public initialImage: String,
       public finalImage: String,
       public initialSound: String,
       public finalSound: String
   ) { }
}