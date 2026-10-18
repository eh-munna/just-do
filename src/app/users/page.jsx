import User from '../../components/User';
import { getUsers } from '../../utils/getUsers';

export default async function Users() {
  const users = await getUsers();

  return (
    <section id="users" className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Users</h1>
          <p className="opacity-60">{users.length} total</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
}
