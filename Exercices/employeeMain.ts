import { serve } from 'https://deno.land/std/http/server.ts';
import { employeeModel } from './employeeModel.ts';

const server = serve({ port: 8000 });
console.log("Server started at http://localhost:8000/")

const employees: employeeModel[] = []; 
employees.push(new employeeModel(1, 'Tamsir SENE', 'Developpeur'));
employees.push(new employeeModel(2, 'Rama NIASS', 'Hotelliere'));
employees.push(new employeeModel(3, 'Moussa DIOP', 'Banquier'));

for await (const req of server){
  req.respond({body: JSON.stringify(employees)});
}
