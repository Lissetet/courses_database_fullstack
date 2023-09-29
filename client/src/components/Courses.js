import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/apiHelper'
import CourseCard from './CourseCard'
import CourseAddCard from './CourseAddCard'
import Loading from './Loading'

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourses = async () => {
      // API call to get all courses. If successful, set the courses state
      // If there is a server error, redirect to the error page
      try {
        const res = await api('/courses')
        const data = await res.json()
        setCourses(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        navigate('/error')
      }
    }
    
    fetchCourses()
  }, [navigate])

  // Map over the courses array and create a CourseCard component for each course
  const CourseListing = 
    courses.map(course => <CourseCard course={course} key={course.id} />)

  return (
    <main>
      <div className="wrap main--grid">
        { loading ? <Loading /> : <>{CourseListing}<CourseAddCard /></> }
      </div>
    </main>
  )
}

export default Courses