import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Users from "./views/Users";
import UserDetail from "./components/users/UserDetail";
import CreateUser from "./views/CreateUser";
import EditUser from "./views/EditUser";
import Computers from "./views/Computers";
import CreateComputer from "./views/CreateComputer";
import EditComputer from "./views/EditComputer";
import CreateTable from "./views/CreateTable";
import EditTable from "./views/EditTable";
import Subjects from "./views/Subjects";
import Tables from "./views/Tables";
import CreateSubject from "./views/CreateSubject";
import EditSubject from "./views/EditSubject";
import Grades from "./views/Grades";
import CreateGrade from "./views/CreateGrade";
import EditGrade from "./views/EditGrade";
import Classrooms from "./views/Classrooms";
import CreateClassroom from "./views/CreateClassroom";
import EditClassroom from "./views/EditClassroom";

function App() {
  const token = localStorage.getItem("auth_token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />

        <Route
          path="/computers"
          element={
            <PrivateRoute>
              <Computers />
            </PrivateRoute>
          }
        />

        <Route
          path="/tables"
          element={
            <PrivateRoute>
              <Tables />
            </PrivateRoute>
          }
        />

        <Route
          path="/subjects"
          element={
            <PrivateRoute>
              <Subjects />
            </PrivateRoute>
          }
        />

        <Route
          path="/grades"
          element={
            <PrivateRoute>
              <Grades />
            </PrivateRoute>
          }
        />

        <Route
          path="/classrooms"
          element={
            <PrivateRoute>
              <Classrooms />
            </PrivateRoute>
          }
        />

        <Route
          path="/users/create"
          element={
            <PrivateRoute>
              <CreateUser />
            </PrivateRoute>
          }
        />

        <Route
          path="/computers/create"
          element={
            <PrivateRoute>
              <CreateComputer />
            </PrivateRoute>
          }
        />

        <Route
          path="/tables/create"
          element={
            <PrivateRoute>
              <CreateTable />
            </PrivateRoute>
          }
        />

        <Route
          path="/subjects/create"
          element={
            <PrivateRoute>
              <CreateSubject />
            </PrivateRoute>
          }
        />

        <Route
          path="/grades/create"
          element={
            <PrivateRoute>
              <CreateGrade />
            </PrivateRoute>
          }
        />

        <Route
          path="/classrooms/create"
          element={
            <PrivateRoute>
              <CreateClassroom />
            </PrivateRoute>
          }
        />

        <Route
          path="/user/:id"
          element={
            <PrivateRoute>
              <UserDetail />
            </PrivateRoute>
          }
        />

        <Route
          path="/user/edit/:id"
          element={
            <PrivateRoute>
              <EditUser />
            </PrivateRoute>
          }
        />

        <Route
          path="/computer/edit/:id"
          element={
            <PrivateRoute>
              <EditComputer />
            </PrivateRoute>
          }
        />

        <Route
          path="/table/edit/:id"
          element={
            <PrivateRoute>
              <EditTable />
            </PrivateRoute>
          }
        />

        <Route
          path="/subjects/edit/:id"
          element={
            <PrivateRoute>
              <EditSubject />
            </PrivateRoute>
          }
        />

        <Route
          path="/grade/edit/:id"
          element={
            <PrivateRoute>
              <EditGrade />
            </PrivateRoute>
          }
        />

        <Route
          path="/classroom/edit/:id"
          element={
            <PrivateRoute>
              <EditClassroom />
            </PrivateRoute>
          }
        />

        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
