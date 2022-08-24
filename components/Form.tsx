import { ChangeEvent, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { EmployeeModel } from '../lib/interfaces/IEmployee';
import { formIdState } from '../redux/reducer';
import AddUserForm from './AddUserForm';
import UpdateUserForm from './UpdateUserForm';

const formReducer = (
  state: EmployeeModel,
  { target }: ChangeEvent<HTMLInputElement>
) => {
  return {
    ...state,
    [target.name]: target.value,
  };
};

function Form() {
  const formId = useSelector(formIdState);
  const [formData, setFormData] = useReducer(formReducer, {} as EmployeeModel);
  return (
    <div className="container mx-auto py-5">
      {!formId ? (
        <AddUserForm formData={formData} setFormData={setFormData} />
      ) : (
        <UpdateUserForm
          formData={formData}
          setFormData={setFormData}
          formId={formId}
        />
      )}
    </div>
  );
}

export default Form;
