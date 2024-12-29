import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Textarea } from '../components/utils/Input';
import Loader from '../components/utils/Loader';
import useFetch from '../hooks/useFetch';
import MainLayout from '../layouts/MainLayout';
import validateManyFields from '../validations';

const Task = () => {

  const authState = useSelector(state => state.authReducer);
  const navigate = useNavigate();
  const { taskId } = useParams();
  const mode = taskId === undefined ? "add" : "update";
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({ description: "" });
  const [formErrors, setFormErrors] = useState({});
  const [fetchData, { loading }] = useFetch();

  useEffect(() => {
    document.title = mode === "add" ? "Add Task" : "Update Task";
  }, [mode]);

  useEffect(() => {
    if (mode === "update") {
      const config = { url: `/tasks/${taskId}`, method: "get", headers: { Authorization: authState.token } };
      fetchData(config, { showSuccessToast: false }).then((data) => {
        setTask(data.task);
        setFormData({ description: data.task.description });
      });
    }
  }, [mode, authState, taskId, fetchData]);

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleReset = e => {
    e.preventDefault();
    setFormData({ description: task.description });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("task", formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const config = {
      url: mode === "add" ? "/tasks" : `/tasks/${taskId}`,
      method: mode === "add" ? "post" : "put",
      data: formData,
      headers: { Authorization: authState.token }
    };

    fetchData(config).then(() => {
      navigate("/");
    });
  }

  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <MainLayout>
      <form className='m-auto my-16 max-w-[800px] bg-white p-8 border-2 shadow-md rounded-md'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className='text-center mb-6 text-xl font-semibold'>{mode === "add" ? "Add New Task" : "Edit Task"}</h2>

            <div className="mb-6">
              <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
              <Textarea
                type="description"
                name="description"
                id="description"
                value={formData.description}
                placeholder="Write the task description here..."
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              />
              {fieldError("description")}
            </div>

            <div className="flex space-x-4">
              <button 
                type="submit"
                className="bg-dark-pink text-white px-6 py-3 font-medium rounded-md hover:bg-dark-light-pink"
                onClick={handleSubmit}
              >
                {mode === "add" ? "Add Task" : "Update Task"}
              </button>

              <button 
                type="button"
                className="bg-red-500 text-white px-6 py-3 font-medium rounded-md hover:bg-red-600"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>

              {mode === "update" && (
                <button
                  type="button"
                  className="bg-dark-orange text-white px-6 py-3 font-medium rounded-md hover:bg-orange-600"
                  onClick={handleReset}
                >
                  Reset
                </button>
              )}
            </div>
          </>
        )}
      </form>
    </MainLayout>
  );
}

export default Task;
