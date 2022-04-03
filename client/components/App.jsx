// Import Dependencies
import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import './styles/main.css';
import TrailsList from "./TrailsList.jsx";
import Quartermaster from "./Quartermaster.jsx";
import TrailProfile from "./TrailProfile.jsx";
import UserProfile from "./UserProfile.jsx";
import BirdingCheckList from "./BirdingCheckList.jsx";
import PackingList from "./PackingList.jsx";
import Login from "./Login.jsx";

const App = () => {
  const [trailList, setTrailList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("TrailList")) {
      const trails = JSON.parse(localStorage.getItem("TrailList"));
      setTrailList(trails);
    }
  }, []);

  // were in trail list
  const handleGetTrails = (location) => {
    // e.preventDefault(); // don't need
    axios
      .get("/api/trailslist", {
        params: { lat: location.lat, lon: location.lon },
      })
      .then((response) => {
        // console.log("Line 24 = ", response.data.data); - returns array of objects of trail data
        setTrailList(response.data.data);
        // add data to local storage
        localStorage.setItem("TrailList", JSON.stringify(response.data.data));
      })
      .catch((err) => {
        console.error("ERROR: ", err);
      });
  };

  return (
    <div>
      <h1 className="Header" alignment="center">
        Trail Feathers
      </h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/login">Login</Link> |{" "}
        <Link to="/trailslist">Trails List</Link> |{" "}
        {/* <Link to="/trailprofile/1">Trail Profile</Link> |{' '} */}
        <Link to="/quartermaster">Quartermaster</Link> |{" "}
        <Link to="/packinglist">Packing List</Link> |{" "}
        <Link to="/birdingchecklist">Birding Checklist</Link> |{" "}
        <Link to="/profile">User Profile</Link> |{" "}
      </nav>
      {/* <Route path="login" element={<Login />} /> */}
      <Routes>
        <Route
          path="trailslist"
          element={
            <TrailsList
              handleGetTrails={handleGetTrails}
              trailList={trailList}
            />
          }
        />
        <Route path="login" element={<Login />} />
        <Route
          path="trailprofile/:id"
          element={<TrailProfile trailList={trailList} />}
        />
        <Route path="quartermaster" element={<Quartermaster />} />
        <Route path="packinglist" element={<PackingList />} />
        <Route path="birdingchecklist" element={<BirdingCheckList />} />
        <Route path="profile" element={<UserProfile />} />
      </Routes>
      <Outlet />
    </div>
  );
};

// Export Component
export default App;
