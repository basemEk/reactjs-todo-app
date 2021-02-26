import React, { useState } from "react";

export default function Label(props){
  const [labels, setLabels] = useState({ label: "" });
  // const [state, setState] = useState({
  //   isAuthenticated: false,
  // });

  function handleChangeLabel(key, value) {
    setLabels({
      ...labels,
      [key]: value,
    });
  }

    // if (state.isAuthenticated) {
      const handleSubmitLabel = (event) => {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          `Bearer ${localStorage.getItem("access_token")}`
        );
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("name", labels.label);

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow",
        };

        fetch("https://codeminos-todo.tk/api/v1/labels", requestOptions)
          .then((response) => response.text())
          // .then((result) => console.log(result))
          .then((json) => {
            const result = JSON.parse(json);
            setLabels(result.data);
            // setState({
            //   isAuthenticated: true,
            // });
          })
          .catch((error) => {
            // setState({
            //   isAuthenticated: false,
            // });
          });
      };
    // }
  

  return (
    <>
      <form onSubmit={(event) => {handleSubmitLabel(event)}}>
        <span>
          <label>Add a Label to your task</label>
          
         
         
        </span>
      </form>
      </>
  );       
      
    // onChange={(event) =>handleChangeLabel("labeling", event.target.value)

  
  
}

