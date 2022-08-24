import { FaSpinner } from 'react-icons/fa';
function Loading() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <FaSpinner className="animate-spin h-10 w-10 mr-3" />
    </div>
  );
}

export default Loading;
