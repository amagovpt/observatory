export class Evaluation {
  id: number;
  title: string;
  score: number;
  errors: any;
  A: number;
  AA: number;
  AAA: number;
  evaluationDate: Date;

  constructor(id: number, title: string, score: number, errors: any,
              A: number, AA: number, AAA: number, evaluationDate: Date) {
    this.id = id;
    this.title = title;
    this.score = parseFloat(score.toFixed(1));
    this.errors = JSON.parse(atob(errors));
    this.A = A;
    this.AA = AA;
    this.AAA = AAA;
    this.evaluationDate = evaluationDate;
  }
}
