/** Controller */

import { NextApiRequest, NextApiResponse } from 'next';
import User from '../model/user';

/**
 * base url: http://localhost:3000/api
 */

//GET: /users
export async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await User.find({});
    if (!users) return res.status(404).json({ error: 'data not found' });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: 'Error while fetching data' });
  }
}

//GET: /user:userid
export async function getUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await User.findById(userId);
      if (!user)
        return res
          .status(404)
          .json({ error: `user with id ${userId} not found` });
      return res.status(200).json(user);
    }
    return res.status(404).json({ error: `user not found` });
  } catch (error) {
    res.status(404).json({ error: 'Cannot get user' });
  }
}

//POST: /users
export async function postUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const formData = req.body;
    if (!formData)
      return res.status(404).json({ error: 'Form data not provided' });

    User.create(formData, (err: any, data: any) => {
      return res.status(200).json(data);
    });
  } catch (error) {
    res.status(404).json({ error });
  }
}

//PUT: /users/:id
export async function putUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log(req.query);
    const { userId } = req.query;
    const formData = req.body;
    if (userId && formData) {
      const user = await User.findByIdAndUpdate(userId, formData);
      return res.status(200).json(user);
    }
    return res.status(404).json({ error: 'User not selected' });
  } catch (error) {
    return res.status(404).json({ error: 'Error while updating user' });
  }
}

//DELETE: /users/:id
export async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query;
    if (userId) {
      await User.findByIdAndDelete(userId);
      return res.status(200).json({ message: 'user deleted' });
    }
    return res.status(404).json({ error: 'User not selected' });
  } catch (error) {
    return res.status(404).json({ error: 'Error while updating user' });
  }
}
