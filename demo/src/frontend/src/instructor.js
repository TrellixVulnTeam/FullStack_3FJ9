import fetch from 'unfetch';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

export const getAllInstructor = async () => {
  fetch("http://localhost:8080/api/v1/instructors")
    .then(checkStatus);

};
