import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAC52OeIPXLtWuGbW60Gh6xO28KoYRM3so",
  authDomain: "cba-pn.firebaseapp.com",
  projectId: "cba-pn",
  storageBucket: "cba-pn.appspot.com",
  messagingSenderId: "742957099949",
  appId: "1:742957099949:web:b529ce56b36d3a560a4f24",
  measurementId: "G-EQD9JDLWZ5",
};

function App() {
  const [notificationPermissionRequested, setNotificationPermissionRequested] =
    useState(false);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    if (notificationPermissionRequested) {
      // Request permission for notifications here
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BOq1NeApdEIrPexZb4_e7Fx_iTt2612blc_qE2EbfloC8oWfYRh-08SIBA6tABBbEXT3Jct89hMxkld06-qYUPw",
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("currentToken", currentToken);
          } else {
            console.log("error generating token");
          }
          fetch("http://13.235.70.12/getTokens", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: userName,
              token: currentToken,
            }),
          });
        })
        .catch((error) => {
          console.log("failed to fetc token", error);
        });
    }
  }, [notificationPermissionRequested, userName]);

  // Callback function to request notification permission
  const requestNotificationPermission = () => {
    setNotificationPermissionRequested(true);
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                onRequestNotificationPermission={requestNotificationPermission}
                setUserName={setUserName}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
