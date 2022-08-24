import { ChangeEvent, FormEvent, useReducer } from 'react';
import { BiBrush } from 'react-icons/bi';
import { EmployeeModel } from '../lib/interfaces/IEmployee';
import Bug from './Bug';
import Success from './Success';

interface Props {
  employee: EmployeeModel;
}

const formReducer = (
  state: EmployeeModel,
  { target }: ChangeEvent<HTMLInputElement>
) => {
  return {
    ...state,
    [target.name]: target.value,
  };
};
function UpdateUserForm({ employee }: Props) {
  const [formData, setFormData] = useReducer(formReducer, {} as EmployeeModel);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) alert('form data has no data');
    console.log(formData);
  };

  if (Object.keys(formData).length > 0)
    return true ? (
      <Bug message="Form Added Successfully" />
    ) : (
      <Success message="Form Added Successfully" />
    );
  return (
    <form className="grid lg:grid-cols-2 w-full gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          name="firstname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="First Name"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="lastname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Last Name"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Email"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="salary"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="salary"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          name="birthday"
          className="border px-5 py-3 focus:outline-none rounded-md"
          placeholder="Birthday"
          onChange={setFormData}
        />
      </div>
      <div className="flex gap-10 items-center">
        <div className="form-check">
          <input
            type="radio"
            name="status"
            value="active"
            onChange={setFormData}
            id="radioDefault1"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 bg-no-repeat bg-contain float-left mt-1 mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault1" className="inline-block text-gray-800">
            Active
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            name="status"
            value="inactive"
            onChange={setFormData}
            id="radioDefault2"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 bg-no-repeat bg-contain float-left mt-1 mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault2" className="inline-block text-gray-800">
            Inactive
          </label>
        </div>
      </div>
      <button className="flex justify-center text-md w-2/6 bg-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-yellow-500 hover:text-yellow-500">
        Update
        <span className="px-1">
          <BiBrush size={24} />
        </span>
      </button>
    </form>
  );
}

export default UpdateUserForm;
