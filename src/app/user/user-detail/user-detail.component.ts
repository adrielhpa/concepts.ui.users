import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HubConnection } from '@aspnet/signalr';
import { User } from '../../model/user';
import { HttpUsersService } from '../services/http-service.service';
import { selectCurrentUser } from '../state/usersSelector.selector';
import { Store } from '@ngrx/store';
import { SignalrService } from 'src/app/signalr-services/signalr-service.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User;
  formGroup: FormGroup;

  get name() {
    return this.formGroup.get('name');
  }
  get age() {
    return this.formGroup.get('age');
  }
  get adress() {
    return this.formGroup.get('adress');
  }
  get city() {
    return this.formGroup.get('city');
  }
  get username() {
    return this.formGroup.get('username');
  }

  constructor(private store: Store, private fb: FormBuilder,
    private httpService: HttpUsersService,
    private router: Router,
    private usersSignalRService: SignalrService
  ) {
    this.usersSignalRService.listenDeletedUser();
  }

  ngOnInit() {
    this.store.select(selectCurrentUser).subscribe((user: any) => {
      this.user = user;
      this.createForm(user);
    });
  }

  createForm(user: User) {
    this.formGroup = this.fb.group({
      name: [{ value: user.name, disabled: true }],
      age: [{ value: user.age, disabled: true }],
      adress: [{ value: user.adress, disabled: true }],
      city: [{ value: user.city, disabled: true }],
      username: [{ value: user.username, disabled: true }]
    });
  }

  deleteUser(userId: number) {
    this.httpService.deleteUser(userId).subscribe(() => {
      this.router.navigate(['/users']);
    })
  }
}
