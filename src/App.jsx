import { useState } from 'react'
import './App.css'

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [jwt, setJwt] = useState("");
  const [profile, setProfile] = useState("");

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
        fetchProfile(data.jwtToken);
      } else {
        console.log(response);
        setMessage("Login Failed")
      }
    } catch (e) {
      console.log(e);
      setMessage("Some Error Occured");
    }
  }

  const fetchProfile = async (token) => {
    try {
      const myHeaders = new Headers();

      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      console.log(token);


      const response = await fetch("http://localhost:8080/profile", requestOptions)

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProfile(data)
      } else {
        console.log(response);
        setMessage("Login to fetch profile")
      }
    } catch (e) {
      console.log(e);
      setMessage("Some Error Occured while fetching profile");
    }
  }

  return (
    <>

      {!profile ? (
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
        </>

      ) : (
        <div>
          <h3>User Profile</h3>
          <p>Username: {profile.username}</p>
          <p>Roles: {profile.role.join(",")}</p>
        </div>
      )}
    </>
  )
}

export default App
