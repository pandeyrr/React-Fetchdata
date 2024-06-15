import React, { useState, useEffect } from "react";

const FetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // simple one without try catch
      /* const res = await fetch("https://jsonplaceholder.typicode.com/users"); // Asynchronous operation (e.g., fetching data from an API)
      const data = await res.json(); // Parse JSON response
      setUsers(data); // Optionally return data or perform other operations
      return data;  */

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Network issue");
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="row m-4">
        <div className="col">
          <h1>Users</h1>
          <table className="table">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Website</th>
              </tr>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.address.street}, {user.address.suite}
                    {", "}
                    {user.address.city}
                    <br />
                    {user.address.zipcode}
                    {", "}
                    {user.address.geo.lat}
                    {", "}
                    {user.address.geo.lng}
                  </td>
                  <td>{user.phone}</td>
                  <td>{user.website}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default FetchUsers;

// JavaScript Promises fetch alaternatives -

// fetchData()
//   .then((data) => {
//     console.log("Data fetched:", data);
//   })
//   .catch((error) => {
//     console.error("Error in fetchData:", error);
//   });

// useEffect(() => {
//   fetch("https://jsonplaceholder.typicode.com/users")
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       setUsers(data);
//       // setLoading(false);
//     })
//     .catch((error) => {
//       setError(error);
//       setLoading(false);
//     });
// }, []);
