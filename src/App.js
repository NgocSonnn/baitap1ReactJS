import "./app.scss";
import { Pagination, Spin } from "antd";
import Task from "./components/Task";
import Divider from "./components/Divider";
import FormInputTask from "./components/FormInputTask";
import { useEffect, useState } from "react";
import { TasksApi } from "./apis/taskApi";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limitPerPage: 5,
    totalTask: 0,
  });

  const fetchAllTask = async (params) => {
    setIsLoading(true);
    const response = await TasksApi.getAllTasks(params);
    setTasks(response.data.data);
    setPagination({
      ...pagination,
      totalTask: response.data.items,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllTask({
      _page: pagination.currentPage,
      _per_page: pagination.limitPerPage,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.currentPage]);

  const renderTaskList = (tasks) => {
    if (!tasks.length) {
      return <div>Please input your task...</div>;
    }
    return tasks.map((task) => (
      <Task
        key={task.id}
        task={task}
        handleRemoveTask={handleRemoveTask}
        handeMakeDoneTask={handeMakeDoneTask}
      ></Task>
    ));
  };

  const handleRemoveTask = async (taskId) => {
    await TasksApi.removeTaskById(taskId);
    fetchAllTask({
      _page: pagination.currentPage,
      _per_page: pagination.limitPerPage,
    });
  };
  const handeMakeDoneTask = async (taskId) => {
    const payload = {
      isDone: true,
    };
    await TasksApi.makeDoneTaskById(taskId, payload);
    fetchAllTask({
      _page: pagination.currentPage,
      _per_page: pagination.limitPerPage,
    });
  };

  const handleAddTask = async (taskName) => {
    console.log(taskName, "taskname");
    const _task = {
      taskName: taskName,
      isDone: false,
      createAt: new Date().getTime(),
    };
    await TasksApi.createTask(_task);
    fetchAllTask({
      _page: pagination.currentPage,
      _per_page: pagination.limitPerPage,
    });
  };
  const handleChangePage = (page) => {
    setPagination({
      ...pagination,
      currentPage: page,
    });
  };

  return (
    <div className="App">
      <div className="todo-list-container">
        <div className="todo-list-wrapper">
          <FormInputTask handleAddTask={handleAddTask}></FormInputTask>
          <div className="todo-list-main">
            {isLoading ? <Spin></Spin> : renderTaskList(tasks)}
          </div>
          <Divider></Divider>
          <div className="todo-list-pagination">
            <Pagination
              defaultCurrent={pagination.currentPage}
              current={pagination.currentPage}
              onChange={(page) => handleChangePage(page)}
              total={pagination.totalTask}
              pageSize={pagination.limitPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
