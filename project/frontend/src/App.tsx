import React, { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";

import PageNotFound from "./pages/PageNotFound";
import { Posts } from "./pages/Posts";
import Users from "./pages/Users";
import Welcome from "./pages/Welcome";
import Info from "./pages/Users/Info";
import Events from "./pages/Users/Events";

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path="users">
            <Route index element={<Users />} />
            <Route path="info" element={<Info />} />
            <Route path="events" element={<Events />} />
          </Route>
          <Route path="posts" element={<Posts />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
