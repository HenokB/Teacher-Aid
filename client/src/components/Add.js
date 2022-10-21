import { useEffect, useState } from "react";
export default function Todo({ todo, toggleComplete, handleDelete, handleEdit,}) {
  const [newTitle, setNewTitle] = useState(todo.title);


  const handleChange = (e) => {
    e.preventDefault();
    if (todo.complete === true) {
      setNewTitle(todo.title);
    } else {
      todo.title = "";
      setNewTitle(e.target.value);
    }
  };
  return (
    <div className="todo">
      <input
        style={{ textDecoration: todo.completed && "line-through" }}
        type="text"
        value={todo.title === "" ? newTitle : todo.title}
        className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
        onChange={handleChange}
      />
      <div>
        <button
          hover="Complete"
          className="px-3 py-1 mt-2 rounded-md border border-gray-200 bg-gray-100 hover:bg-gray-200 cursor-pointer"
          onClick={() => toggleComplete(todo)}
        >
          <>Complete✅</>
        </button>
        <button
          className="px-3 py-1 mt-2 rounded-md border border-gray-200 bg-gray-100 hover:bg-gray-200 cursor-pointer"
          onClick={() => handleEdit(todo, newTitle)}
        >
          <>Edit📝</>
        </button>
        <button className="px-3 py-1 mt-2 rounded-md border border-gray-200 bg-gray-100 hover:bg-gray-200 cursor-pointer" onClick={() => handleDelete(todo.id)}>
        <>Delete🗑</>
        </button>
        
      </div>
    </div>
  );
}