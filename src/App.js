import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import ThemeProvider from "./contexts/ThemeProvider";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const userdata = [
  {
    username: "Ha",
    savedMovies: [],
  },
  {
    username: "Tam",
    savedMovies: [],
  },
  {
    username: "Duong",
    savedMovies: [],
  },
  {
    username: "Lien",
    savedMovies: [],
  },
  {
    username: "Thu",
    savedMovies: [],
  },
];

window.localStorage.setItem("userdata", JSON.stringify(userdata));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
