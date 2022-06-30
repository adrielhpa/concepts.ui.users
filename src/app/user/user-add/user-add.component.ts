import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SignalrService } from 'src/app/signalr-services/signalr-service.service';
import { User } from '../../model/user';
import { HttpUsersService } from '../services/http-service.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
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
  get password() {
    return this.formGroup.get('password');
  }

  constructor(private store: Store, private fb: FormBuilder,
    private httpService: HttpUsersService,
    private router: Router,
    private usersSignalRService: SignalrService
    ) {
    this.usersSignalRService.listenCreatedUser();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group({
      name: [''],
      age: [null],
      adress: [''],
      city: [''],
      username: [''],
      password: ['']
    });
  }

  submit() {
    let user: User = {
      id: 0,
      name: this.name?.value,
      age: this.age?.value,
      adress: this.adress?.value,
      city: this.city?.value,
      username: this.username?.value,
      password: this.password?.value
    }
    this.httpService.createUser(user).subscribe(() => {
      this.router.navigate(['/users']);
    })
  }
}
