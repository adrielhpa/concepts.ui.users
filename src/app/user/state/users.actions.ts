import { createAction, props } from "@ngrx/store";
import { User } from "../../model/user";

export const loadUsers = createAction(
  '[Users] Load Users',
  props<{ users: User[] }>()
);
export const selectUserId = createAction(
  '[Users] Select User Id',
  props<{ userId: number }>()
);
export const createUser = createAction(
  '[Users] Create User',
  props<{ user: User }>()
);
export const updateUser = createAction(
  '[Users] Update User',
  props<{ user: User }>()
);
export const deleteUser = createAction(
  '[Users] Delete User',
  props<{ userId: number }>()
);
