import React, { useEffect, useState } from "react";
import AuthPage from "./pages/AuthPage";
import NotesPage from "./pages/NotesPage";

function App() {
  // Accept token from URL after Google redirect
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const t = url.searchParams.get("token");
    if (t) {
      localStorage.setItem("token", t);
      setToken(t);
      // remove token from URL
      url.searchParams.delete("token");
      window.history.replaceState({}, document.title, url.pathname);
    }
  }, []);

  return token ? (
    <NotesPage
      token={token}
      onLogout={() => {
        localStorage.removeItem("token");
        setToken(null);
      }}
    />
  ) : (
    <AuthPage
      onLogin={(t) => {
        localStorage.setItem("token", t);
        setToken(t);
      }}
    />
  );
}

export default App;
