import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import "./TodoList.css";

const TodosList = ({ onDelete }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("/api/tasks")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  const handleStatusChange = (taskId, event) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.TaskId === taskId) {
        return { ...todo, Status: event.target.value };
      }
      return todo;
    });
    setTodos(updatedTodos);
    axios
      .put(`/api/tasks/${taskId}`, { status: event.target.value })
      .then((response) => {
        console.log("Status updated successfully:", response.data);
        window.location.reload()
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handleDelete = (taskId) => {
    axios
      .delete(`/api/tasks/${taskId}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.TaskId !== taskId));
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  return (
    <List className="todos-list-container">
      {todos.map((todo) => (
        <ListItem key={todo._id} className="list-item">
          <ListItemText
            primary={todo.task}
            secondary={
              <>
                {`${todo.description} -- ${todo.time} -- ${dayjs(
                  todo.date
                ).format("DD/MM/YYYY")} -- `}
                <span
                  style={{
                    color:
                      todo.status === "Pending"
                        ? "red"
                        : todo.status === "In Progress"
                        ? "yellow"
                        : "green",
                    fontWeight: "bold",
                  }}
                >
                  {todo.status}
                </span>
              </>
            }
            primaryTypographyProps={{ variant: "h6", fontWeight: "bold" }}
            secondaryTypographyProps={{
              variant: "body2",
            }}
          />

          <Select
            placeholder={todo.status}
            value={todo.Status}
            onChange={(event) => handleStatusChange(todo._id, event)}
            className="status-select"
            style={{ minWidth: 120 }}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
          </Select>
          <IconButton
            onClick={() => handleDelete(todo._id)}
            className="delete-button"
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TodosList;
