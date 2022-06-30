import { Store } from '@ngrx/store';
import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ResponseData } from '../model/response';
import { createUser, deleteUser, updateUser } from '../user/state/users.actions';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: HubConnection;
  private started$ = new BehaviorSubject<boolean>(false);

  get started(): Observable<boolean> {
    return this.started$ as Observable<boolean>;
  }

  constructor(private store: Store, private toastrService: ToastrService) {
    let builder = new HubConnectionBuilder();
    this.hubConnection = builder.withUrl('https://localhost:7293/messagesHub').build();
    this.hubConnection.start().then(() => this.started$.next(true)).catch(error => console.log(error));
  }

  joinGroup(groupName: string) {
    this.hubConnection.invoke('JoinGroup', groupName);
  }

  exitGroup(groupName: string) {
    this.hubConnection.invoke('ExitGroup', groupName);
  }

  listenCreatedUser(){
    this.hubConnection.on('CreatedUser', (msg: ResponseData) => {
        if (msg.isValid) {
          this.store.dispatch(createUser({user: msg.userData}));
          this.toastrService.success(msg.message, 'Success');
        }
        else {
          this.toastrService.error(msg.message, 'Error');
        }
      });
  }

  listenUpdatedUser(){
    this.hubConnection.on('UpdatedUser', (msg: ResponseData) => {
        if (msg.isValid) {
          this.store.dispatch(updateUser({user: msg.userData}));
          this.toastrService.success(msg.message, 'Success');
        }
        else {
          this.toastrService.error(msg.message, 'Error');
        }
      });
  }

  listenDeletedUser() {
    this.hubConnection.on('DeletedUser', (msg: ResponseData) => {
      if (msg.isValid) {
        this.store.dispatch(deleteUser({ userId: msg.userData.id }));
        this.toastrService.success(msg.message, 'Success');
      }
      else {
        this.toastrService.error(msg.message, 'Error');
      }
    });
  }
}
