import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import SessionTable from "./components/dashboard/SessionTable";
import NewSession from "./pages/NewSession";
import Session from "./pages/Session";
import JoinSession from "./pages/JoinSession";

import "react-toastify/dist/ReactToastify.css";
import "./assets/scss/global/_global_vars.scss";
import "./assets/scss/global/_global.scss";
import "./assets/scss/login/login.scss";
import "./assets/scss/forms/_forms.scss";
import "./assets/scss/buttons/_button.scss";
import "./assets/scss/navbar/_navbar.scss";
import "./assets/scss/dashboard/_sessiontable.scss";
import "./assets/scss/newsession/_newsession.scss";
import "./assets/scss/session/_session.scss";
import "./assets/scss/loader/_loader.scss";
import "./assets/scss/session/_storiesTab.scss";
import "./assets/scss/session/_joinsession.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route index element={<SessionTable />} />
            <Route path="/newSession" element={<NewSession />} />
            <Route path="/session/:id" element={<Session />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/session/:id/join/" element={<JoinSession />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
