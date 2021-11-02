import React, { useState, useEffect } from "react";
import "./TodoApp.css";
import axios from "axios";
// import { AddTask, getTask } from "../services/taskServices";

function TodoApp() {
  const [task, setTask] = useState("");
  const [tasklist, setTaskList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((res) => {
        console.log(res);
        setTaskList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const AddTask = async () => {
    if (task !== "") {
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          mode: "no-cors",
        },
        body: JSON.stringify({ task }),
      });
      const responseJSON = await response.json();
      console.log("responseJSON", responseJSON);
      if (response.status === 200) {
        setTaskList([
          ...tasklist,
          {
            _id: responseJSON._id,
            task: responseJSON.task,
            completed: responseJSON.completed,
          },
        ]);
        setTask("");
      }
    }
  };

  const deletetask = async (e, id) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseText = await response.text();
      console.log(responseText);
    } catch (error) {
      console.log(`error occured while task with id ${id} trying to delete!`);
    }
    setTaskList(tasklist.filter((t) => t._id !== id));
  };

  const taskCompleted = (e, id) => {
    e.preventDefault();
    //let's find index of element
    const element = tasklist.findIndex((elem) => elem.id === id);

    //copy array into new variable
    const newTaskList = [...tasklist];

    //edit our element
    newTaskList[element] = {
      ...newTaskList[element],
      isCompleted: true,
    };

    setTaskList(newTaskList);
  };

  return (
    <div className="todo">
      <input
        type="text"
        name="text"
        id="text"
        onChange={(e) => handleChange(e)}
        value={task}
        placeholder="Add task here..."
      />
      <button className="add-btn" onClick={AddTask}>
        Add
      </button>
      <br />
      {tasklist !== [] ? (
        <ul>
          {tasklist.map((t) => (
            <li
              className={t.isCompleted ? "crossText" : "listitem"}
              key={t._id}
            >
              {t.task}
              <button
                className="completed"
                onClick={(e) => taskCompleted(e, t.id)}
              >
                Completed
              </button>

              <button className="delete" onClick={(e) => deletetask(e, t._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default TodoApp;
