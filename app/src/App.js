import React, { useState, useEffect } from "react";
import Label from "./Label";
import Register from "./Registration";

export default function App() {
  const [add_task_data, setAddTaskData] = useState({
    title: "",
    description: "",
    date: "",
    priority: "",
  });

  const [add_label_data, setAddLabel] = useState({
    name: ""
  });

  const [state, setState] = useState({
    isAuthenticated: false,
  });
  
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [todos, setTodos] = useState([]);
  const [labels, setLabels] = useState([]);

  const fetchTodos = () => {
    if (state.isAuthenticated) {
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("access_token")}`
      );

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("https://codeminos-todo.tk/api/v1/to-dos", requestOptions)
        .then((response) => response.text())
        .then((json) => {
          const result = JSON.parse(json);
          setTodos(result.data);
        })
        .catch((error) => console.log("error", error));
    }
  };

  const checkUserAuth = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access_token")}`
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://codeminos-todo.tk/api/v1/labels", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        setState({
          isAuthenticated: true,
        });
      })
      .catch((error) => {
        setState({
          isAuthenticated: true,
        });
      });
  };

  useEffect(() => {
    checkUserAuth();
    return () => {};
  }, []);
  const fetchLabels = () => {
    if (state.isAuthenticated) {
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("access_token")}`
      );

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("https://codeminos-todo.tk/api/v1/labels", requestOptions)
        .then((response) => response.text())
        .then((json) => {
          const result = JSON.parse(json);
          setLabels(result.data);
        })
        .catch((error) => console.log("error", error));
    }
  };

  useEffect(() => {
    fetchTodos();
    fetchLabels();
  }, [state.isAuthenticated]);

  function handleChange(key, value) {
    setAddTaskData({
      ...add_task_data,
      [key]: value,
    });
  }

  function handleLabelChange(key, value) {
    setAddLabel({
      ...add_label_data,
      [key]: value,
    });
  }

  function hanldeLoginChange(key, value) {
    setLogin({
      ...login,
      [key]: value,
    });
  }
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", "pas2ss@gmail.com2");
    urlencoded.append("password", "212312322");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    fetch("https://codeminos-todo.tk/api/login", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.access_token !== undefined) {
          localStorage.setItem("access_token", data.access_token);
          setState({
            ...state,
            isAuthenticated: true,
          });
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleAddToDoSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access_token")}`
    );
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("title", add_task_data.title);
    urlencoded.append("description", add_task_data.description);
    urlencoded.append("priority", add_task_data.priority);
    urlencoded.append("date", add_task_data.date);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("https://codeminos-todo.tk/api/v1/to-dos", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        fetchTodos();
      })
      .catch((error) => console.log("error", error));
  };

  const handleAddLabelSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access_token")}`
    );
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("name", add_label_data.name);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("https://codeminos-todo.tk/api/v1/labels", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        fetchTodos();
      })
      .catch((error) => console.log("error", error));
  };

  function childSendActionToParent(message) {
    alert(message);
  }

  return (
    <>
      <div>
        <Register childSendActionToParent={childSendActionToParent} /> <br />
        <br />
      </div>
      <div className="App">
        <h2>Welcome to your task manager app</h2>

        {!state.isAuthenticated && (
          <div>
            <h2>You are not authenticated, please login</h2>

            <form onSubmit={(event) => handleLoginSubmit(event)}>
              <div>
                <label>Email: </label>
                <input
                  type="text"
                  name="email"
                  onChange={(event) => {
                    hanldeLoginChange("email", event.target.value);
                  }}
                />
              </div>
              <div>
                <label>password</label>

                <input
                  type="text"
                  name="password"
                  onChange={(event) => {
                    hanldeLoginChange("password", event.target.value);
                  }}
                />
              </div>
              <input type="submit" value="login" />
            </form>
          </div>
        )}
        {state.isAuthenticated && (
          <div>
            <button
              onClick={() => {
                setState({
                  ...state,
                  isAuthenticated: false,
                });
                localStorage.removeItem("access_token");
              }}
            >
              Logout
            </button>

            <h2>Tasks</h2>
            {todos.map((todo) => {
              return (
                <div>
                  Title {todo.title} --- description: {todo.description}
                </div>
              );
            })}

            <h2>Add TODO</h2>
            <form
              onSubmit={(event) => {
                handleAddToDoSubmit(event);
              }}
            >
              <div>
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  onChange={(event) => {
                    handleChange("title", event.target.value);
                  }}
                />
              </div>
              <div>
                <label>description</label>

                <input
                  type="text"
                  name="description"
                  onChange={(event) => {
                    handleChange("description", event.target.value);
                  }}
                />
              </div>
              <div>
                <label>date</label>

                <input
                  type="text"
                  name="date"
                  onChange={(event) => {
                    handleChange("date", event.target.value);
                  }}
                />
              </div>
              <div>
                <label>priority</label>
                <input
                  type="text"
                  name="priority"
                  onChange={(event) => {
                    handleChange("priority", event.target.value);
                  }}
                />
              </div>

              <Label add_task={add_task_data} />

              <input type="submit" value="add todo" />
            </form>
            <h2>Labels</h2>
            {labels.map((label) => {
              return <div>Name {label.name}</div>;
            })}

            <h2>Add Label</h2>
            <form
              onSubmit={(event) => {
                handleAddLabelSubmit(event);
              }}
            >
              <div>
                <label>Choose the label name</label>
                <input
                  type="text"
                  name="title"
                  onChange={(event) => {
                    handleLabelChange("name", event.target.value);
                  }}
                />
              </div>

              <input type="submit" value="add label" />
            </form>
          </div>
        )}
      </div>
    </>
  );
}
