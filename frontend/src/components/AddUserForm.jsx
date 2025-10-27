import { useState } from "react";

export default function AddUserForm({ onUserAdded }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !role) {
      alert("⚠️ Please enter both name and role!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, role }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("✅ User added successfully:", data);
        alert("✅ User added successfully!");
        setName("");
        setRole("");
        onUserAdded(); // Refresh user list in App.jsx
      } else {
        const error = await response.json();
        console.error("❌ Error:", error);
        alert("❌ Failed to add user: " + (error.error || "Unknown error"));
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("❌ Failed to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-3 bg-white p-4 rounded-2xl shadow-md w-full max-w-xl"
    >
      <input
        type="text"
        placeholder="👤 Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full md:w-1/3"
      />
      
      <input
        type="text"
        placeholder="🎓 Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 rounded w-full md:w-1/3"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "⏳ Adding..." : "➕ Add User"}
      </button>
    </form>
  );
}
