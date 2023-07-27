import React, { useState, useRef, useEffect } from "react";
import "./Todo.css";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

//video completed 47:19

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    if(todo !== ''){
    setTodos([...todos, {list : todo,id : Date.now(), status:false}]);
    console.log(todos);
    setTodo("");
    }
    if(editId){
        const editTodo= todos.find((data)=>data.id === editId)
        const updateTodo =todos.map((data)=>data.id === editTodo.id
        ? (data ={id : data.id , list : todo}) : (data={id : data.id , list : data.list}))
        setTodos(updateTodo);
        setEditId(0);
        setTodo('')
    }
  }

  const onDelete=(id)=>{
    setTodos(todos.filter((data)=> data.id !== id)) 
  }

  const onComplete=(id)=>{
    let complete =todos.map((data)=>{
        if(data.id === id){
            return ({...data,status : !data.status})
        }
        return data;
    })
    setTodos(complete)
}

const onEdit=(id)=>{
    const editTodo=todos.find((data)=> data.id === id)
    setTodo(editTodo.list)
    setEditId(editTodo.id)
}

  const inputRef = useRef("null");

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          onChange={(event) => setTodo(event.target.value)}
          placeholder="Enter your TODO"
          className="form-control"
        />
        <button onClick={addTodo}>{editId ? "Edit ": "Add"}</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((data, id) => (
            <li key={id} className="list-items">
              <div className="list-items-list" id={data.status ? "list-item" : " "}>{data.list}</div>
              <span>
                <IoMdDoneAll
                  className="list-item-icons"
                  id="completed"
                  title="Complete"
                  onClick={()=>onComplete(data.id)}
                />
                <FiEdit 
                className="list-item-icons" 
                id="edit" 
                title="Edit" 
                onClick={()=>onEdit(data.id)}
                />
                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={()=>onDelete(data.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
