import { take, Observable, tap, filter, takeWhile } from 'rxjs';
import { loadUsers, selectUserId } from '../state/users.actions';
import { HttpUsersService } from '../services/http-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { selectAllUsers } from '../state/usersSelector.selector';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  statistics: any;
  users$!: Observable<User[]>;
  private alive = true;
  constructor(private httpService: HttpUsersService, private store: Store, private router: Router) { }

  ngOnInit() {
    this.users$ = this.store.select(selectAllUsers);
    this.users$.pipe(take(1), filter(x => x.length === 0)).subscribe(() => this.getAllUsers());
    this.users$.pipe(takeWhile(() => this.alive)).subscribe(users => this.getStatistics(users));
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  getAllUsers() {
    this.httpService.getAllUsers().subscribe((users: User[]) => {
      this.store.dispatch(loadUsers({ users }));
      this.getStatistics(users);
    });
  }

  getStatistics(users: User[]) {
    this.httpService.requestLambda(JSON.stringify(users)).subscribe((res) => {
      this.statistics = res
    });
  }

  goToDetail(userId: number) {
    this.store.dispatch(selectUserId({ userId }));
    this.router.navigate(['users', userId]);
  }
}
