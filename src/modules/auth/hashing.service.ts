import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;


  
export function validate(password: string, hash: string): Promise<boolean>{
  return bcrypt.compare(password,hash);
} 


export function hash(password: string): Promise<string> { 
  return bcrypt.hash(password, saltOrRounds);
}