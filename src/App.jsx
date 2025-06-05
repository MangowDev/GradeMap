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

import TeacherSubjects from "./views/TeacherSubjects/TeacherSubjects";
import Unauthorized from "./views/Unauthorized";

function App() {
  const token = localStorage.getItem("auth_token");
  const userRole = localStorage.getItem("user_role");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            <PrivateRoute userRole={userRole}>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/unauthorized"
          element={
            <PrivateRoute userRole={userRole}>
              <Unauthorized />
            </PrivateRoute>
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute userRole={userRole}>
              <Users />
            </PrivateRoute>
          }
        />

        <Route
          path="/computers"
          element={
            <PrivateRoute userRole={userRole}>
              <Computers />
            </PrivateRoute>
          }
        />

        <Route
          path="/tables"
          element={
            <PrivateRoute userRole={userRole}>
              <Tables />
            </PrivateRoute>
          }
        />

        <Route
          path="/subjects"
          element={
            <PrivateRoute userRole={userRole}>
              <Subjects />
            </PrivateRoute>
          }
        />

        <Route
          path="/grades"
          element={
            <PrivateRoute userRole={userRole}>
              <Grades />
            </PrivateRoute>
          }
        />

        <Route
          path="/classrooms"
          element={
            <PrivateRoute userRole={userRole}>
              <Classrooms />
            </PrivateRoute>
          }
        />

        {/* Crear */}
        <Route
          path="/users/create"
          element={
            <PrivateRoute userRole={userRole}>
              <CreateUser />
            </PrivateRoute>
          }
        />

        <Route
          path="/computers/create"
          element={
            <PrivateRoute userRole={userRole}>
              <CreateComputer />
            </PrivateRoute>
          }
        />

        <Route
          path="/tables/create"
          element={
            <PrivateRoute userRole={userRole}>
              <CreateTable />
            </PrivateRoute>
          }
        />

        <Route
          path="/subjects/create"
          element={
            <PrivateRoute userRole={userRole}>
              <CreateSubject />
            </PrivateRoute>
          }
        />

        <Route
          path="/grades/create"
          element={
            <PrivateRoute userRole={userRole}>
              <CreateGrade />
            </PrivateRoute>
          }
        />

        <Route
          path="/classrooms/create"
          element={
            <PrivateRoute userRole={userRole}>
              <CreateClassroom />
            </PrivateRoute>
          }
        />

        {/* Editar */}
        <Route
          path="/user/edit/:id"
          element={
            <PrivateRoute userRole={userRole}>
              <EditUser />
            </PrivateRoute>
          }
        />

        <Route
          path="/computer/edit/:id"
          element={
            <PrivateRoute userRole={userRole}>
              <EditComputer />
            </PrivateRoute>
          }
        />

        <Route
          path="/table/edit/:id"
          element={
            <PrivateRoute userRole={userRole}>
              <EditTable />
            </PrivateRoute>
          }
        />

        <Route
          path="/subjects/edit/:id"
          element={
            <PrivateRoute userRole={userRole}>
              <EditSubject />
            </PrivateRoute>
          }
        />

        <Route
          path="/grade/edit/:id"
          element={
            <PrivateRoute userRole={userRole}>
              <EditGrade />
            </PrivateRoute>
          }
        />

        <Route
          path="/classroom/edit/:id"
          element={
            <PrivateRoute userRole={userRole}>
              <EditClassroom />
            </PrivateRoute>
          }
        />

        {/* Detalles y otros */}
        <Route
          path="/user/grades/:id"
          element={
            <PrivateRoute userRole={userRole}>
              <UserGrades />
            </PrivateRoute>
          }
        />

        <Route
          path="/subjects/list/:id"
          element={
            <PrivateRoute userRole={userRole}>
              <SubjectList />
            </PrivateRoute>
          }
        />

        <Route
          path="/user/read/:id"
          element={
            <PrivateRoute userRole={userRole}>
              <UserDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/computer/read/:id"
          element={
            <PrivateRoute userRole={userRole}>
              <ComputerDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/grade/read/:id"
          element={
            <PrivateRoute userRole={userRole}>
              <GradeDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/classroom/read/:id"
          element={
            <PrivateRoute userRole={userRole}>
              <ClassroomDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/table/read/:id"
          element={
            <PrivateRoute userRole={userRole}>
              <TableDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/subjects/read/:id"
          element={
            <PrivateRoute userRole={userRole}>
              <SubjectDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/teacher/subjects/:id"
          element={
            <PrivateRoute userRole={userRole}>
              <TeacherSubjects />
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
