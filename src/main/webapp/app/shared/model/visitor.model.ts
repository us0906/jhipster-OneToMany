import { IDoctor } from 'app/shared/model/doctor.model';

export interface IVisitor {
  id?: number;
  name?: string;
  doctor?: IDoctor;
}

export class Visitor implements IVisitor {
  constructor(public id?: number, public name?: string, public doctor?: IDoctor) {}
}
