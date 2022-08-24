import { ChangeEvent, Dispatch, FormEvent } from 'react';
import { BiPlus } from 'react-icons/bi';
import { useMutation, useQueryClient } from 'react-query';
import { addUser, getUsers } from '../lib/helper';
import { EmployeeData, EmployeeModel } from '../lib/interfaces/IEmployee';
import Bug from './Bug';
import Loading from './Loading';
import Success from './Success';

interface Props {
  formData: EmployeeModel;
  setFormData: Dispatch<ChangeEvent<HTMLInputElement>>;
}

function AddUserForm({ formData, setFormData }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    addUser,
    {
      onSuccess: () => {
        queryClient.prefetchQuery('users', getUsers);
      },
    }
  );
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0)
      return alert('form data has no data');
    let { firstname, lastname, email, avatar, date, salary, status } = formData;

    const model: EmployeeData = {
      name: `${firstname} ${lastname}`,
      avatar:
        avatar ||
        `https://randomuser.me/api/portraits/men/${Math.floor(
          Math.random() * 10
        )}.jpg`,
      date,
      email,
      salary,
      status: status ?? 'Active',
    };

    mutate(model);
  };
  if (isLoading) return <Loading />;
  if (isError) return <Bug message={(error as Error).message} />;
  if (isSuccess) return <Success message="Form Added Successfully" />;
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
          name="date"
          className="border px-5 py-3 focus:outline-none rounded-md"
          onChange={setFormData}
        />
      </div>
      <div className="flex gap-10 items-center">
        <div className="form-check">
          <input
            type="radio"
            name="status"
            value="Active"
            checked
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
            value="Inactive"
            onChange={setFormData}
            id="radioDefault2"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 bg-no-repeat bg-contain float-left mt-1 mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault2" className="inline-block text-gray-800">
            Inactive
          </label>
        </div>
      </div>
      <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
        Add{' '}
        <span className="px-1">
          <BiPlus size={24} />
        </span>
      </button>
    </form>
  );
}

export default AddUserForm;
