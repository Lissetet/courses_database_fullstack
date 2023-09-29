import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route element={<PrivateRoute />} >
          <Route path="/courses/:id/update" element={<UpdateCourse />} />
          <Route path="/courses/create" element={<CreateCourse />} />
        </Route>
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signout" element={<UserSignOut />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/error" element={<UnhandledError />} />
        <Route path="/notfound" element={<NotFound item="course"/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
