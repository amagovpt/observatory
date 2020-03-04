import { Evaluation } from './evaluation';

export class Page {
  id: number;
  uri: string;
  creationDate: Date;
  evaluation: Evaluation;

  constructor(id: number, uri: string, creationDate: Date) {
    this.id = id;
    this.uri = uri;
    this.creationDate = creationDate;
  }

  addEvaluation(id: number, title: string, score: number, errors: any, tot: any,
                A: number, AA: number, AAA: number, evaluationDate: Date): void {
    this.evaluation = new Evaluation(id, title, score, errors, tot, A, AA, AAA, evaluationDate);
  }
}
