import { BiCheck } from 'react-icons/bi';

interface Props {
  message: string;
}

function Success({ message }: Props) {
  return (
    <div className="success container mx-auto">
      <div className="flex justify-center mx-auto border border-yellow-200 w-3/6 text-gray-900 text-md my-4 py-2 text-center bg-opacity-5">
        {message} <BiCheck size={25} color={'rgb(34,197,94)'} />
      </div>
    </div>
  );
}

export default Success;
