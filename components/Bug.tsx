import { BiCheck } from 'react-icons/bi';

interface Props {
  message: string;
}

function Bug({ message }: Props) {
  return (
    <div className="success container mx-auto">
      <div className="flex justify-center mx-auto border border-red-200 w-3/6 text-red-500 text-md my-4 py-2 text-center bg-opacity-5">
        {message} <BiCheck size={25} color={'rgb(248 113 113)'} />
      </div>
    </div>
  );
}

export default Bug;
