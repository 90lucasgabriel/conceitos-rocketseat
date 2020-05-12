import { Request, Response } from 'express';
import CreateUser from './services/CreateUser';

export function HelloWorld(request: Request, response: Response) {
  const user = CreateUser({
    email: 'email@email.com',
    password: '1234',
    techs: ['NodeJS', 'React', { title: 'Angular', experience: 100 }],
  });

  return response.json({ message: 'Hello World!' });
}
