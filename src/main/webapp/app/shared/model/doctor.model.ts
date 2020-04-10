import { IVisitor } from 'app/shared/model/visitor.model';

export interface IDoctor {
  id?: number;
  name?: string;
  visitors?: IVisitor[];
}

export class Doctor implements IDoctor {
  constructor(public id?: number, public name?: string, public visitors?: IVisitor[]) {}
}
