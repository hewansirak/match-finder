import React, { useState } from "react";
import "./App.css";
import UserRegistration from "./components/UserRegistration";
import type { UserData } from "./types/user";

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleRegistration = (userData: UserData) => {
    setUserData(userData);
    console.log("User registered:", userData);
  };
  return (
    <div>
      <UserRegistration onComplete={handleRegistration} />
    </div>
  );
}

export default App;
