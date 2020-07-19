export class employeeModel {
  id: number;
  name: string;
  profession: string;

  constructor(_id: number, _name: string, _profession: string){
    this.id = _id;
    this.name = _name;
    this.profession = _profession;
  }
}