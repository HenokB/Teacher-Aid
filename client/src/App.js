import "./App.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from "react";
import AddQue from "./components/AddQuestion";
import img1 from "./assets/1.jpg"
import img2 from "./assets/2.jpg"
import img3 from "./assets/3.jpg"
import img4 from "./assets/4.jpg"
import { Popover, Transition } from '@headlessui/react'
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
import 'reactjs-popup/dist/index.css';
import Modal from "./Modal";

function App() {
  const [date, setDate] = useState(new Date());  
  const features = [
    { name: 'Why?', description: 'It saves the precious time of teachers to create questions' },
    { name: 'Store', description: 'Not only it will save time but teachers can also save questions and check them later' },
    { name: 'How?', description: 'To create the questions, it uses a huge dataset backed natural language processing model.' },
    { name: 'Share', description: 'You can also share it with just a click' },
      ]
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
  <div className="relative overflow-hidden bg-white">
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          <svg
            className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <Popover>
            <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
              <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
                  <div className="flex w-full items-center justify-between md:w-auto">
                    <a href="#">
                      <p className="text-indigo-700 text-2xl font-bold">Teachers Aid 📚</p>
                    </a>
                    
                  </div>
                </div>
              </nav>
            </div>
          </Popover>

          <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Save Time with</span>{' '}
                <span className="block text-indigo-600 xl:inline">Teacher's Aid</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                A place for every teacher to help them create questions for exam, class work, home work, assignment or anything you can imagine.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                  >
                    <Modal />
                  </a>
                </div>
                
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
          src="https://th.bing.com/th/id/R.32b88274cc7cd521b05fbaad65649a68?rik=QMOmEgyhLJiAuw&pid=ImgRaw&r=0"
          alt=""
        />
      </div>
    </div>
     
      <div className="bg-gray-50">
          </div>
    <div>
    
    
    </div>
      <header>
        <h1 className="text-center  mt-9 font-mono text-3xl text-indigo-600">
          Features
        </h1>
        <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
      
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-indigo-700 sm:text-4xl">Teacher's Aid</h2>
          <p className="mt-4 text-gray-500">
          Do you know that a research showed that (92%) in our study out today said they 
          don’t have enough time to prepare effectively for classroom teaching? 
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            src={img1}
            alt="Image 1"
            className="rounded-lg bg-gray-100"
          />
          <img
            src={img3}
            alt="Image 3"
            className="rounded-lg bg-gray-100"
          />
          <img
            src={img2}
            alt="Image 2"
            className="rounded-lg bg-gray-100"
          />
          <img
            src={img4}
            alt="Image 4"
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>        
              



    <div className=" mx-auto grid max-w-2xl items-center mb-4">
    <h1 className="text-center mb-4 font-mono text-3xl text-indigo-600">
      Check dates 
    </h1>
    <div className=' mx-auto grid max-w-2xl items-center font-mono '>
    <Calendar
      onChange={setDate}
      value={date}
      selectRange={true}
    />
  </div>
  {date.length > 0 ? (
    <p className='text-center font-mono'>
      <span className='font-mono text-green-700 bold'>Start:</span>{' '}
      {date[0].toDateString()}
      &nbsp;|&nbsp;
      <span className='font-mono text-red-700 bold'>End:</span> {date[1].toDateString()}
    </p>
  ) : (
    <p className='text-center px-3 py-1 mt-2 rounded-md border border-gray-200 bg-gray-100 hover:bg-gray-200 cursor-pointer'>
      <span className='bold'>Selected date:</span>{' '}
      {date.toDateString()}
    </p>
  )}
</div>


      <div id="create" className=" mx-auto grid max-w-2xl grid-cols-1 items-center">
        <h1 className="text-center mb-4 font-mono text-3xl text-indigo-600">
          Create Questions 
        </h1>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="comment"
            className="items-center block text-sm font-medium text-gray-700"
          >
            Give me a topic <br></br>
            E.g. Inorganic Chemistry
          </label>
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center">
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
        <div className="rounded-md mt-4 bg-blue-50 p-4 mx-auto grid max-w-2xl grid-cols-1 items-center">
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
      <h1 className="text-center  mt-4 mb-4 font-mono text-3xl text-indigo-600">
          Do you want to save questions?
        </h1>
      

      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center">
        <AddQue />
      </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center space-4">
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
      
      <footer className="footer ease-linear">
        <p className="text-center mt-4 mb-5 font-mono text-1x1 text-black-700/70">© 2022 Teachers Aid. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;