import React, { useState } from "react";
import { Card, TextField, Typography, Button } from "@mui/material";
import TodosList from "../TodosList/TodosList";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios"; // Import Axios for making HTTP requests
import "./Todos.css";

export default function Todos() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(dayjs());
  const [status,setStatus] = useState("In Progress");
  const [todoData, setTodoData] = useState("In-progress");

  const generateTaskId = () => {
    return Math.random().toString(36).substr(2, 9);
  };
  const getTodayDate = () => {
    const today = new Date();
    return today;
  };
  const getCurrentTime = () => {
    const now = new Date();
    return now.format("hh:mm A");
  };

  const handleAddTodo = async () => {
    if (task.trim() === "") {
      alert("Please fill task fields.");
      return;
    }

    if (description.trim() === "") {
      alert("Please fill description fields.");
      return;
    }

    const taskId = generateTaskId();
   

    const newTodoData = {
      taskId: taskId,
      task: task,
      description: description,
      date: selectedDate,
      time: selectedTime.format("hh:mm A"),
      status:status
    };

    try {
      const response = await axios.post("/api/tasks", newTodoData);
      window.location.reload();
      setTodoData(response.data.todo);
      setTask("");
      setDescription("");
      setSelectedDate(dayjs());
      setSelectedTime(dayjs());
      setStatus("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div className="todos-container">
      <div className="background-video">
        <video autoPlay loop muted className="video-element">
          <source
            src="https://player.vimeo.com/external/451417702.sd.mp4?s=ca2cdba9ca18cfc67eabaaf95a58367dca7eaaa2&profile_id=164&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>
      </div>
      <Card className="card-container" sx={{ bgcolor: "transparent" }}>
        <span className="task-container">
          <Typography>Task</Typography>
          <TextField
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
            className="task-input"
            InputProps={{
              className: "task-input-field",
            }}
          />
          <span className="datetime-container">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                className="time-picker"
                value={selectedTime}
                onChange={(newValue) => setSelectedTime(newValue)}
                ampm={true}
              />
              <DatePicker
                className="date-picker"
                value={selectedDate}
                minDate={getTodayDate()}
                sx={{marginLeft:"1rem"}}
                onChange={(newValue) => setSelectedDate(newValue)}
              />
            </LocalizationProvider>
          </span>
        </span>
        <span className="description-container">
          <Typography>Description</Typography>
          <TextField
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="description-input"
            InputProps={{
              className: "description-input-field",
            }}
          />
        </span>
        <span className="button-container">
          <Button variant="contained" size="small" sx={{ bgcolor: "red" }} onClick={handleAddTodo}>
            Add Todo
          </Button>
        </span>
      </Card>
      <TodosList todoData={todoData} />
    </div>
  );
}
