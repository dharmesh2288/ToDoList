import React, { useEffect, useState } from "react";
import "./App.css";
import { AiTwotoneDelete, AiOutlineCheck } from "react-icons/ai";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedToDos, setCompletedToDos] = useState([]);

  const handleAddToDo = () => {
    let newToDoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedToDoArr = [...allTodos];
    updatedToDoArr.push(newToDoItem);
    setTodos(updatedToDoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedToDoArr));
  };

  const handledeleteToDo = (index) => {
    let removeToDo = [...allTodos];
    removeToDo.splice(index);
    localStorage.setItem("todolist", JSON.stringify(removeToDo));
    setTodos(removeToDo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + "-" + mm + "-" + yyyy + "at" + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedToDos];
    updatedCompletedArr.push(filteredItem);
    setCompletedToDos(updatedCompletedArr);
    handledeleteToDo(index);
    localStorage.setItem("completedToDos", JSON.stringify(updatedCompletedArr));
  };

  const handledeleteCompletedToDo = (index) => {
    let removeToDo = [...completedToDos];
    removeToDo.splice(index);
    localStorage.setItem("completedToDos", JSON.stringify(removeToDo));
    setCompletedToDos(removeToDo);
  };

  useEffect(() => {
    let savedItem = JSON.parse(localStorage.getItem("todolist"));
    let savedCompleted = JSON.parse(localStorage.getItem("completedToDos"));
    if (savedItem) {
      setTodos(savedItem);
    }

    if (savedCompleted) {
      setCompletedToDos(savedCompleted);
    }
  }, []);
  return (
    <div className="App">
      <h1>To Do List</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title:</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task"
            />
          </div>
          <div className="todo-input-item">
            <label>Description:</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Description of the task"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={() => handleAddToDo()}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            type="button"
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            ToDo
          </button>
          <button
            type="button"
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {isCompleteScreen === false &&
            allTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <AiTwotoneDelete
                      className="icon"
                      onClick={() => handledeleteCompletedToDo(index)}
                      title="Delete?"
                    />
                    <AiOutlineCheck
                      className="check-icon"
                      onClick={() => handleComplete(index)}
                      title="Complete"
                    />
                  </div>
                </div>
              );
            })}

          {isCompleteScreen === true &&
            completedToDos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed on:{item.completedOn}</small>
                    </p>
                  </div>
                  <div>
                    <AiTwotoneDelete
                      className="icon"
                      onClick={() => handledeleteToDo(index)}
                      title="Delete?"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
