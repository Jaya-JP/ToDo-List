import React from 'react';
import tik from '../assets/tick.png';
import nottik from '../assets/nottik.png';
import delete_icon from '../assets/delete.png';

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className='flex items-center my-3 gap-2'>
      <div onClick={() => toggle(id)} className='flex flex-1 items-center cursor-pointer'>
        <img src={isComplete ? tik : nottik} alt="" className='w-7' />
        <p className={`text-slate-700 ml-4 text-[18px] font-semibold ${isComplete ? 'line-through' : ''}`}>
          {text}
        </p>
      </div>
      <img onClick={() => deleteTodo(id)} src={delete_icon} alt="" className='w-5 cursor-pointer' />
    </div>
  );
}

export default TodoItems;
