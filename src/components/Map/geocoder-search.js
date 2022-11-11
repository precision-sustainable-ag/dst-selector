async function getAddressFromLoc() {
  await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'GET', // *Type of request GET, POST, PUT, DELETE
    mode: 'cors', // Type of mode of the request
    cache: 'no-cache', // options like default, no-cache, reload, force-cache
    credentials: 'same-origin', // options like include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json', // request content type
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    // body: JSON.stringify(data) // Attach body with the request
  })
    .then((response) => response.json())
    .then((response) => {
      setter({ users: response.json() });
      console.log(response.result);
    })
    .catch((err) => console.error(err));
}

export { getAddressFromLoc };
