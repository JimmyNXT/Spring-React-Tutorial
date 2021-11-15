import fetch from "unfetch";

export const getAllStudents = () => fetch("/students").then(checkStatus);

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    response.json().then((e) => {
      error.error = e;
    });
    return Promise.reject(error);
  }
};

export const addNewStudent = (student) =>
  fetch("/students", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(student),
  }).then(checkStatus);
