import { useSelector } from 'react-redux';
import { EmployeeModel } from '../lib/interfaces/IEmployee';
import { formIdState } from '../redux/reducer';
import AddUserForm from './AddUserForm';
import UpdateUserForm from './UpdateUserForm';
function Form() {
  const formId = useSelector(formIdState);
  return (
    <div className="container mx-auto py-5">
      {!formId ? (
        <AddUserForm />
      ) : (
        <UpdateUserForm employee={{} as EmployeeModel} />
      )}
    </div>
  );
}

export default Form;
