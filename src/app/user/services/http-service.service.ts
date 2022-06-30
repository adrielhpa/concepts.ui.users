import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../../model/user';

const API_URL = 'https://localhost:7222/api/User';

@Injectable({
  providedIn: 'root'
})
export class HttpUsersService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL);
  }

  createUser(user: User): Observable<boolean> {
    return this.http.post<boolean>(API_URL, user);
  }

  updateUser(user: User): Observable<boolean> {
    return this.http.put<boolean>(`${API_URL}/${user.id}`, user);
  }

  deleteUser(userId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${API_URL}/${userId}`);
  }

  requestLambda(users: any): Observable<any[]> {
    return this.http.post<any[]>('https://nwwroov2vx6luaipgxcmrdlukm0dkimh.lambda-url.us-east-1.on.aws/', users);
  }
}
