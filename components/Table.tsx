import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../lib/helper';
import { EmployeeData } from '../lib/interfaces/IEmployee';
import {
  toggleChangeAction,
  toggleFormState,
  updateAction,
} from '../redux/reducer';
import Loading from './Loading';
function Table() {
  const { isError, isLoading, data, error } = useQuery('users', getUsers);
  if (isLoading) return <Loading />;
  if (isError) return <div>got the {error as string}</div>;
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-16 py-2">
            <span className="text-gray-200">Name</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Email</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Salary</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Birthday</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Status</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {data.map((v: EmployeeData, i: any) => (
          <Tr employee={v} key={i} />
        ))}
      </tbody>
    </table>
  );
}

interface TrProps {
  employee: EmployeeData;
}

function Tr({ employee }: TrProps) {
  const visible = useSelector(toggleFormState);
  const dispatch = useDispatch();
  const onUpdate = () => {
    dispatch(toggleChangeAction());
    console.log(employee._id);
    console.log(visible);
    if (visible) {
      dispatch(updateAction(employee._id));
    }
  };
  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2 flex flex-row items-center">
        <img
          src={employee.avatar}
          alt=""
          className="rounded-full object-cover w-8 h-8"
        />
        <span className="text-center px-1 font-semibold">{employee.name}</span>
      </td>
      <td className="px-16 py-2">
        <span className="text-center ml-2 font-semibold">{employee.email}</span>
      </td>
      <td className="px-16 py-2">
        <span className="text-center ml-2 font-semibold">
          $ {employee.salary}
        </span>
      </td>
      <td className="px-16 py-2">
        <span className="text-center ml-2 font-semibold">{employee.date}</span>
      </td>
      <td className="px-16 py-2">
        <button className="cursor">
          <span
            className={`${
              employee.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
            } text-white px-5 py-1 rounded-full`}
          >
            {employee.status}
          </span>
        </button>
      </td>
      <td className="px-16 py-2 text-center flex justify-around gap-4">
        <button className="cursor" onClick={onUpdate}>
          <BiEdit size={25} color={'rgb(34,197,94)'} />
        </button>
        <button className="cursor">
          <BiTrashAlt size={25} color={'rgb(244,63,94)'} />
        </button>
      </td>
    </tr>
  );
}
//hello test
export default Table;
