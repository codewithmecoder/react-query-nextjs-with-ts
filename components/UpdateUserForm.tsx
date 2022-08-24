import { ChangeEvent, Dispatch, FormEvent } from 'react';
import { BiBrush } from 'react-icons/bi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUsers, updateUser } from '../lib/helper';
import { EmployeeData, EmployeeModel } from '../lib/interfaces/IEmployee';
import {
  toggleChangeAction,
  toggleFormState,
  updateAction,
} from '../redux/reducer';
import Bug from './Bug';
import Loading from './Loading';

interface Props {
  formId: string;
  formData: EmployeeModel;
  setFormData: Dispatch<ChangeEvent<HTMLInputElement>>;
}

function UpdateUserForm({ formId, formData, setFormData }: Props) {
  const queryClient = useQueryClient();

  const visible = useSelector(toggleFormState);
  const dispatch = useDispatch();
  const onUpdate = () => {
    dispatch(toggleChangeAction());
    if (visible) {
      dispatch(updateAction());
    }
  };

  const { data, isError, isLoading, error } = useQuery<EmployeeData>(
    ['users', formId],
    () => getUser(formId)
  );

  const updateMutation = useMutation<EmployeeData>(
    (newData) => updateUser(formId, newData as any),
    {
      onSuccess: async (data) => {
        console.log('data update');
        queryClient.prefetchQuery('users', getUsers);
        queryClient.invalidateQueries(['users', formId]);
        onUpdate();
      },
    }
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let userName = `${formData.firstname ?? firstname} ${
      formData.lastname ?? lastname
    }`;

    let updated = Object.assign({}, data, formData, { name: userName });

    await updateMutation.mutateAsync(updated as any);
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>got some error {(error as Error)?.message}</div>;
  if (!data) return <div>No data</div>;
  const { avatar, date, email, name, salary, status, _id } = data;

  const [firstname, lastname] = name
    ? name.split(' ')
    : [formData.firstname, formData.lastname];

  if (updateMutation.isError)
    return <Bug message={`${(updateMutation.error as Error)?.message}`} />;

  if (updateMutation.isLoading) return <Loading />;

  return (
    <form className="grid lg:grid-cols-2 w-full gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          defaultValue={firstname}
          type="text"
          name="firstname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="First Name"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          defaultValue={lastname}
          type="text"
          name="lastname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Last Name"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          defaultValue={email}
          type="text"
          name="email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Email"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          defaultValue={salary}
          type="text"
          name="salary"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="salary"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          defaultValue={date}
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
            defaultChecked={status == 'Active'}
            type="radio"
            name="status"
            value="Active"
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
            defaultChecked={status == 'Inactive'}
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
