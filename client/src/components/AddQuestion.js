import React,{useState} from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddTodo() {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "") {
      await addDoc(collection(db, "todos"), {
        title,
        completed: false,
      });
      setTitle("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="input_container">
        <input
          className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          type="text"
          placeholder="Save Questions"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="px-3 py-1 mt-2 rounded-md border border-gray-200 bg-gray-100 hover:bg-gray-200 cursor-pointer">
        <button>Save</button>
      </div>
    </form>
  );
}
