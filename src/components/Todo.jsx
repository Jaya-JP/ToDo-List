import React, { useEffect, useRef, useState } from 'react';
import img1 from '../assets/img1.png';
import TodoItems from './TodoItems';
import './Todo.css'

const Todo = () => {
  const inputRef = useRef();
  const [todo, setTodo] = useState(() => {
    // Retrieve todo state from local storage when the component mounts
    const storedTodo = localStorage.getItem('todoList');
    return storedTodo ? JSON.parse(storedTodo) : [];
  });

  // Save todo state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todo));
  }, [todo]);

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      return;
    }
    const newToDo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodo((prev) => [...prev, newToDo]);
    inputRef.current.value = "";
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodo((prevTodo) => {
      return prevTodo.filter((todo) => todo.id !== id);
    });
  };

  const toggle = (id) => {
    setTodo((prevTodo) => {
      return prevTodo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  return (
    <div className=' bg-emerald-200  place-self-center w-8/12 max-w-sm flex flex-col p-8 min-h-[550px] rounded-xl'>
      {/* title */}
      <div className="flex items-center mt-8 gap-3">
        <img src={img1} alt="" className='w-9' />
        <h1 className='text-xl md:text-3xl font-semibold'>To-Do List</h1>
      </div>
      {/* input */}
      <div className='flex items-center my-7 bg-gray-400 rounded-full relative'>
        <input
          ref={inputRef}
          type="text"
          placeholder='Add Your Task'
          className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-3 placeholder:text-slate-700'
        />
        <button
          onClick={add}
          className=' absolute right-0  border-none rounded-full bg-red-600 w-[80px] h-14 text-white text-lg font-medium cursor-pointer'
        >
          ADD
        </button>
      </div>

      {/* to do list */}
      <div>
        {todo.map((item) => (
          <TodoItems
            key={item.id}
            text={item.text}
            id={item.id}
            isComplete={item.isComplete}
            deleteTodo={deleteTodo}
            toggle={toggle}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
