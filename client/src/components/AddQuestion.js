import React,{useState} from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddQue() {
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
          placeholder="Type here to save questions"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="px-3 py-1 mt-2">
        <button className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save Questions</button>
      </div>
    </form>
  );
}
