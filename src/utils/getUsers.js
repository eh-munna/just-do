export async function getUsers({ params } = {}) {
  const url = params?.id
    ? `https://jsonplaceholder.typicode.com/users/${params.id}`
    : `https://jsonplaceholder.typicode.com/users`;

  const res = await fetch(url);
  if (!res.ok) throw new Response('Not Found', { status: 404 });
  return res.json();
}
