import { caller } from "@/trpc/server";
import { de } from "zod/v4/locales";

const Home = async() => {
  const users = await caller.getUsers();

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;