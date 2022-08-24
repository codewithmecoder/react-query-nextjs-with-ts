import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface InitialClientState {
  toggleForm: boolean;
  formId: string | undefined;
}

const client: InitialClientState = {
  formId: undefined,
  toggleForm: false,
};

const initialState = {
  client,
};

export const ReducerSlice = createSlice({
  name: 'crudapp',
  initialState,
  reducers: {
    toggleChangeAction: (state) => {
      state.client.toggleForm = !state.client.toggleForm;
    },
    updateAction: (state, action: PayloadAction<string | undefined>) => {
      state.client.formId = action.payload;
    },
  },
});

export const { toggleChangeAction, updateAction } = ReducerSlice.actions;
export const toggleFormState = (state: RootState) =>
  state.app.client.toggleForm;
export const formIdState = (state: RootState) => state.app.client.formId;
export default ReducerSlice.reducer;
