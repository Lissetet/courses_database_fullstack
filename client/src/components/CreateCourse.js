import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/apiHelper'
import CourseForm from './CourseForm'
import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';

const CourseDetail = () => {
  const { credentials, authUser } = useContext(UserContext)
  const userId = authUser.id;
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()

  const onSubmit = async (course) => {
    course.userId = userId;

    // API call to create the course. If successful, redirect to the course detail page
    // If the user is not authorized, redirect to the forbidden page
    // If there is a server error, redirect to the error page
    try {
      const res = await api(`/courses`, 'POST', course, credentials, true)
      if (res.status === 201) {
        const courses = await api('/courses')
        const data = await courses.json()
        navigate(`/courses/${data[data.length - 1].id}`)
      } else if (res.status === 400) {
        const data = await res.json()
        setErrors(data.errors)
      } else if (res.status === 401) {
        navigate('/forbidden')
      } 
    } catch (error) {
      console.log(error)
      navigate('/error')
    }
  }

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        { // Conditional rendering of the ErrorsDisplay component
          errors.length ? <ErrorsDisplay errors={errors}/> : null }
        <CourseForm onSubmit={onSubmit} action="Create"/>
      </div>
    </main>
  );
};

export default CourseDetail;