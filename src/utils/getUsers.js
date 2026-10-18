export const getUsers = async () => {
  try {
    const res = await fetch('http://localhost:3004/users');
    return await res.json();
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};
