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
import CreateUser from "./views/Create/CreateUser";
import EditUser from "./views/Edit/EditUser";
import Computers from "./views/Computers";
import CreateComputer from "./views/Create/CreateComputer";
import EditComputer from "./views/Edit/EditComputer";
import CreateTable from "./views/Create/CreateTable";
import EditTable from "./views/Edit/EditTable";
import Subjects from "./views/Subjects";
import Tables from "./views/Tables";
import CreateSubject from "./views/Create/CreateSubject";
import EditSubject from "./views/Edit/EditSubject";
import Grades from "./views/Grades";
import CreateGrade from "./views/Create/CreateGrade";
import EditGrade from "./views/Edit/EditGrade";
import Classrooms from "./views/Classrooms";
import CreateClassroom from "./views/Create/CreateClassroom";
import EditClassroom from "./views/Edit/EditClassroom";
import UserGrades from "./views/UserGrades/UserGrades";
import SubjectList from "./views/SubjectList/SubjectList";
import UserDetails from "./views/Details/UserDetails";
import ComputerDetails from "./views/Details/ComputerDetails";
import GradeDetails from "./views/Details/GradeDetails";
import ClassroomDetails from "./views/Details/ClassroomDetails";
import TableDetails from "./views/Details/TablesDetails";
import SubjectDetails from "./views/Details/SubjectDetails";

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
          path="/user/grades/:id"
          element={
            <PrivateRoute>
              <UserGrades />
            </PrivateRoute>
          }
        />

        <Route
          path="/subjects/list/:id"
          element={
            <PrivateRoute>
              <SubjectList />
            </PrivateRoute>
          }
        />

        <Route
          path="/user/read/:id"
          element={
            <PrivateRoute>
              <UserDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/computer/read/:id"
          element={
            <PrivateRoute>
              <ComputerDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/grade/read/:id"
          element={
            <PrivateRoute>
              <GradeDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/classroom/read/:id"
          element={
            <PrivateRoute>
              <ClassroomDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/table/read/:id"
          element={
            <PrivateRoute>
              <TableDetails />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/subjects/read/:id"
          element={
            <PrivateRoute>
              <SubjectDetails />
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
