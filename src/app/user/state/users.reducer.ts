import { on } from '@ngrx/store';
import { loadUsers, selectUserId, updateUser, createUser, deleteUser } from './users.actions';
import { User } from '../../model/user';
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer } from '@ngrx/store';

export interface State extends EntityState<User> {
  selectedUserId: number;
}
export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id,
  sortComparer: false
});
export const initialState: State = adapter.getInitialState({
  selectedUserId: 0,
});

export const userReducer = createReducer(
  initialState,
  on(loadUsers, (state, { users }) => adapter.setAll(users, state)),
  on(selectUserId, (state, { userId }) => ({ ...state, selectedUserId: userId })),
  on(createUser, (state, { user }) => adapter.setOne(user, state)),
  on(updateUser, (state, { user }) => adapter.upsertOne(user, state)),
  on(deleteUser, (state, { userId }) => adapter.removeOne(userId, state))
);

//Aux Functions
export function selectedUserId(user: User) {
  return user.id;
}
