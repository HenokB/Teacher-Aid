import "./App.css";
import { useEffect, useState } from "react";
import AddTodo from "./components/AddQuestion";
import Todo from "./components/Add";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const API_URL = "http://localhost:3001";
  const [data, setData] = useState(null);
  const [prompt, setPrompt] = useState("");

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData(null);
    fetch(`${API_URL}/api?prompt=${prompt}`)
      .then((res) => res.json())
      .then((data) => setData(`${data.generations[0].text.slice(0, -1)}`));
  };


  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, "todos", todo.id), { title: title });
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
  return (

    
    <div className="mt-12 lg:mx-10 px-10 sm:14 md:22 lg:px-20 space-y-4">
     <h1 className="text-center font-bold tracking-tight text-gray-900 sm:text-4xl">
          Teachers Aid ✏️
        </h1>
      <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Ready to dive in?</span>
          <span className="block text-indigo-600">Start for free now.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#create"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
            >
              Get started
            </a>
          </div>
          
        </div>
      </div>
    </div>
     
      <header>
        <div className="flex justify-center">
       
          <img
            className="h-40 w-30 items-center"
            src="https://pngimg.com/uploads/teacher/teacher_PNG58.png"
            alt=""
          />
          <p className="h-20 font-mono border-2 border-l-gray-400 px-3 py-1 bg-gray-200">
            “If you have to put someone on a pedestal, put teachers. They are
            society’s heroes. – Guy Kawasaki
          </p>
        </div>
        
 
<div id="create">
        <h1 className="text-center mb-4 font-mono text-3xl text-gray-700/70">
          Create Questions 
        </h1>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700"
          >
            Give me a topic <br></br>
            E.g. Inorganic Chemistry
          </label>
          <div className="mt-1">
            <textarea
              rows={4}
              name="comment"
              id="comment"
              placeholder="Give me a topic and I will send you a question related to the topic. Nice right?"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder:text-sm"
              onChange={handleChange}
            />
          </div>
          <input
            type="submit"
            value="Create Questions"
            className="px-3 py-1 mt-2 rounded-md border border-gray-200 bg-gray-100 hover:bg-gray-200 cursor-pointer"
          />
        </form>
        </div>
        <div className="rounded-md mt-4 bg-blue-50 p-4">
          <div className="flex">
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700">
                {!data ? "Question will appear here." : data}
              </p>
              <p className="mt-3 text-sm md:mt-0 md:ml-6">
              
              </p>
              
            </div>
          </div>
          
        </div>
      </header>

      

      <div className="mt-1">
        <AddTodo />
      </div>
          <div className="todo_container">
              {todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
          ))}
      </div>
      <footer>
        <p className="text-center mb-2 font-mono text-3xl text-gray-700/70">Teachers Aid 2022</p>
      </footer>
    </div>
  );
}

export default App;