import UserProfile from '../../../components/UserProfile';

export default async function UserDetail({ params }) {
  const { id } = await params;

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await res.json();

  return (
    <>
      <UserProfile user={user} />
    </>
  );
}
