import { MouseEventHandler } from 'react';
import { BiCheck, BiX } from 'react-icons/bi';

interface Props {
  deletehandler: MouseEventHandler<HTMLButtonElement>;
  canclehandler: MouseEventHandler<HTMLButtonElement>;
}

function DeleteModel({ deletehandler, canclehandler }: Props) {
  return (
    <div className="flex gap-5">
      <button>Are you sure?</button>
      <button
        onClick={deletehandler}
        className="flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50"
      >
        Yes{' '}
        <span className="px-1">
          <BiX color="rgb(255 255 255)" size={25} />
        </span>
      </button>
      <button
        onClick={canclehandler}
        className="flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gree-500 hover:border-green-500 hover:text-gray-50"
      >
        No{' '}
        <span className="px-1">
          <BiCheck color="rgb(255 255 255)" size={25} />
        </span>
      </button>
    </div>
  );
}

export default DeleteModel;
