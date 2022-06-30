import { createFeatureSelector, createSelector } from "@ngrx/store";
import { adapter, State } from "./users.reducer";

const {selectIds, selectEntities, selectAll} = adapter.getSelectors();

export const getSelectedUserId = (state: State) => state.selectedUserId;
export const selectUserState =  createFeatureSelector<State>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  selectAll
);
export const selectUserIds = createSelector(
  selectUserState,
  selectIds
);
export const selectUserEntities = createSelector(
  selectUserState,
  selectEntities
);
export const selectCurrentUserId = createSelector(
  selectUserState,
  (state) => state.selectedUserId
);
export const selectCurrentUser = createSelector(
  selectUserEntities,
  selectCurrentUserId,
  (entities, userId) => entities[userId]
);
