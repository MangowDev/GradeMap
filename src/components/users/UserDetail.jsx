import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!user) return <p className="text-center text-xl">Loading...</p>;

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">User: {user.name}</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>DNI:</strong> {user.dni}</p>
      <p><strong>Username:</strong> {user.username}</p>
    </div>
  );
}
