import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'user', password: 'user123', role: 'user' },
    { id: 3, username: 'viewer', password: 'viewer123', role: 'viewer' },
  ];

  async findByUsername(username: string) {
    return this.users.find(user => user.username === username);
  }
}