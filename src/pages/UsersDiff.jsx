import { use } from 'react';

export default function UsersDiff({ getUsers }) {
  const users = use(getUsers);
  return <h2 className="text-2xl">Number of users: {users?.length}</h2>;
}
