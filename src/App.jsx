import { useState } from 'react'
import './App.css'

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [jwt, setJwt] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "username": username,
        "password": password
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw
      };

      const response = await fetch("http://localhost:8080/login", requestOptions)

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setJwt(data.jwtToken);
        setMessage("Login Successful");
      } else {
        console.log(response);
        setMessage("Login Failed")
      }
    } catch (e) {
      console.log(e);
      setMessage("Some Error Occured");
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}
      {jwt && <p>{jwt}</p>}
    </>
  )
}

export default App
