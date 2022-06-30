import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SignalrService } from 'src/app/signalr-services/signalr-service.service';
import { User } from '../../model/user';
import { HttpUsersService } from '../services/http-service.service';
import { selectCurrentUser } from '../state/usersSelector.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user: User;
  detailMode = true;
  formGroup!: FormGroup;

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
    this.usersSignalRService.listenUpdatedUser();
  }

  ngOnInit() {
    this.store.select(selectCurrentUser).subscribe((user: any) => {
      this.user = user;
      this.createForm(user);
    });
  }

  createForm(user: User) {
    this.formGroup = this.fb.group({
      name: [user.name],
      age: [user.age],
      adress: [user.adress],
      city: [user.city],
      username: [user.username]
    });
  }

  submit() {

    let updatedUser: User = {
      id: this.user?.id,
      name: this.name?.value,
      age: this.age?.value,
      adress: this.adress?.value,
      city: this.city?.value,
      username: this.username?.value,
      password: this.user?.password
    }
    this.httpService.updateUser(updatedUser).subscribe((user) => {
      this.router.navigate(['/users']);
    });
  }
}
