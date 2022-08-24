import type { NextPage } from 'next';
import Head from 'next/head';
import { BiUserPlus } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../components/Form';
import Table from '../components/Table';
import { toggleChangeAction, toggleFormState } from '../redux/reducer';

const Home: NextPage = () => {
  const visible = useSelector(toggleFormState);
  const dispatch = useDispatch();
  const addEmpHandler = () => {
    dispatch(toggleChangeAction());
  };
  return (
    <section>
      <Head>
        <title>NextTS CRUD React Query</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-5">
        <h1 className="text-xl md:text-5xl text-center font-bold py-10">
          Employee Management
        </h1>

        <div className="container mx-auto flex justify-between py-5 border-b">
          <div className="left flex gap-3">
            <button
              className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-gray-800"
              onClick={addEmpHandler}
            >
              Add Employee
              <span className="px-1">
                <BiUserPlus size={23} />
              </span>
            </button>
          </div>
        </div>
        {visible ? <Form /> : <></>}
        <div className="container lg:mx-auto">
          <Table />
        </div>
      </main>
    </section>
  );
};

export default Home;
