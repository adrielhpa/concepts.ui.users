import { SignalrService } from 'src/app/signalr-services/signalr-service.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from '../app.component';
import { userReducer } from './state/users.reducer';
import { UserRoutingModule } from './user-routing.module';
import { StoreModule } from '@ngrx/store';
import { UserAddComponent } from './user-add/user-add.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserComponent } from './user.component';
import { UsersListComponent } from './users-list/users-list.component';



@NgModule({
  declarations: [
    UserComponent,
    UsersListComponent,
    UserDetailComponent,
    UserEditComponent,
    UserAddComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    StoreModule.forFeature('users', userReducer),
    StoreDevtoolsModule.instrument({ maxAge: 29 }),
  ],
  providers: [SignalrService]
})
export class UserModule { }
