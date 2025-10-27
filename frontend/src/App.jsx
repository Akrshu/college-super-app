import { useEffect, useState } from "react";
import axios from "axios";
import AddUserForm from "./Components/AddUserForm";

export default function App() {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch backend message + users
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
      setMessage("Connected to backend successfully!");
    } catch (err) {
      console.error("Error fetching users:", err);
      setMessage("❌ Backend connection failed!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-3">
        College Super App 🚀
      </h1>

      <p className="text-gray-600 mb-6">Message from backend:</p>
      <p className="text-green-600 font-semibold mb-6">{message}</p>

      {/* Add User Form */}
      <AddUserForm onUserAdded={fetchData} />

      {/* User List */}
      <h2 className="text-xl font-semibold mt-8 mb-4">👥 Users List:</h2>
      <ul className="bg-white shadow-md rounded-xl p-4 w-full max-w-md">
        {users.length === 0 ? (
          <p className="text-gray-500">No users yet</p>
        ) : (
          users.map((u, i) => (
            <li key={i} className="border-b last:border-0 py-2">
              <strong>{u.name}</strong> — {u.role}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
