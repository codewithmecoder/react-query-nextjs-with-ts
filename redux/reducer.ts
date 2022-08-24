import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface InitialClientState {
  toggleForm: boolean;
  formId: string | undefined;
  deleteId: string | undefined;
}

const client: InitialClientState = {
  formId: undefined,
  toggleForm: false,
  deleteId: undefined,
};

const initialState = {
  client,
};

export const ReducerSlice = createSlice({
  name: 'crudapp',
  initialState,
  reducers: {
    toggleChangeAction: (state, action: PayloadAction<string | undefined>) => {
      state.client.toggleForm = !state.client.toggleForm;
    },
    updateAction: (state, action: PayloadAction<string | undefined>) => {
      state.client.formId = action.payload;
    },
    deleteAction: (state, action: PayloadAction<string | undefined>) => {
      state.client.deleteId = action.payload;
    },
  },
});

export const { toggleChangeAction, updateAction, deleteAction } =
  ReducerSlice.actions;
export const toggleFormState = (state: RootState) =>
  state.app.client.toggleForm;
export const formIdState = (state: RootState) => state.app.client.formId;
export const deleteIdState = (state: RootState) => state.app.client.deleteId;
export default ReducerSlice.reducer;
