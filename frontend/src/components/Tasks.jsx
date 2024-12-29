import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const Tasks = () => {
  const authState = useSelector(state => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = { url: "/tasks", method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then(data => setTasks(data.tasks)).catch((error) => {
      console.error('Error fetching tasks:', error);
    });
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
    fetchData(config)
      .then(() => fetchTasks())
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  return (
    <div className="my-2 mx-auto max-w-[700px] py-4">
      {tasks.length !== 0 && <h2 className="my-2 ml-2 md:ml-0 text-xl font-semibold">Your tasks ({tasks.length})</h2>}
      {loading ? (
        <Loader />
      ) : (
        <div>
          {tasks.length === 0 ? (
            <div className="w-[600px] h-[300px] flex items-center justify-center gap-4">
              <span>No tasks found</span>
              <Link
                to="/tasks/add"
                className="bg-dark-pink text-white hover:bg-dark-light-pink font-medium rounded-md px-4 py-2"
              >
                + Add new task
              </Link>
            </div>
          ) : (
            tasks.map((task, index) => (
              <div key={task._id} className="bg-white my-4 p-4 text-gray-600 rounded-md shadow-md">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Task #{index + 1}</span>

                  <div className="flex items-center space-x-2">
                    <Tooltip text="Edit this task" position="top">
                      <Link to={`/tasks/${task._id}`} className="text-green-600 hover:text-green-700 cursor-pointer">
                        <i className="fa-solid fa-pen"></i>
                      </Link>
                    </Tooltip>

                    <Tooltip text="Delete this task" position="top">
                      <span
                        onClick={() => handleDelete(task._id)}
                        className="text-red-500 hover:text-red-600 cursor-pointer"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </Tooltip>
                  </div>
                </div>

                <div className="whitespace-pre mt-2 text-gray-800">{task.description}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Tasks;
