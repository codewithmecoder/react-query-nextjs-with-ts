import { EmployeeData } from './interfaces/IEmployee';

const BASE_URL = 'http://localhost:3000';
export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/api/users`);
  const json = res.json();
  return json;
};

export const getUser = async (userId: string) => {
  const res = await fetch(`${BASE_URL}/api/users/${userId}`);
  const json = res.json();
  return json;
};

export const addUser = async (formData: EmployeeData) => {
  try {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    const res = await fetch(`${BASE_URL}/api/users`, options);
    const json = await res.json();
    return json;
  } catch (error) {
    return error;
  }
};

export const updateUser = async (userId: string, formData: EmployeeData) => {
  try {
    const options: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    const res = await fetch(`${BASE_URL}/api/users/${userId}`, options);
    const json = await res.json();
    return json;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(`${BASE_URL}/api/users/${userId}`, options);
    const json = await res.json();
    return json;
  } catch (error) {
    return error;
  }
};
