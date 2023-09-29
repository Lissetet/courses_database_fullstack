import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../utils/apiHelper'
import UserContext from '../context/UserContext'
import ActionsBar from './ActionsBar'
import CourseDetailForm from './CourseDetailForm'
import NotFound from './NotFound'
import Loading from './Loading'

const CourseDetail = () => {
  const [course, setCourse] = useState({})
  const [loading, setLoading] = useState(true)
  const [ownedByUser, setOwnedByUser] = useState(false)
  const { authUser, credentials } = useContext(UserContext)
  const { id } = useParams()
  const navigate = useNavigate()

  const handleDelete = async () => {
    // Confirm with the user that they want to delete the course
    const confirmDelete = window.confirm('Are you sure you want to delete this course?')
    if (!confirmDelete) return

    // API call to delete the course. If successful, redirect to the home page
    // If the user is not authorized, redirect to the forbidden page
    // If there is a server error, redirect to the error page
    try {
      const res = await api(`/courses/${id}`, 'DELETE', null, credentials)
      if (res.status === 204) {
        navigate('/')
      } else if (res.status === 401) {
        navigate('/forbidden')
      } else {
        throw new Error()
      }
    } catch (error) {
      console.log(error)
      navigate('/error')
    }
  }

  useEffect(() => {
    const fetchCourse = async (id) => {
      // API call to get the course. If successful, set the course state
      // If the course is not found, redirect to the not found page
      // If there is a server error, redirect to the error page
      try {
        const res = await api(`/courses/${id}`)
        if (res.status === 200) {
          const data = await res.json()
          setCourse(data)
          setOwnedByUser(authUser && authUser.id === data?.user.id)
          setLoading(false)
        } else if (res.status === 404) {
          navigate('/notfound')
        } else {
          throw new Error()
        }
      } catch (error) {
        console.log(error)
        navigate('/error')
      }
    }
    fetchCourse(id)
  }, [id, navigate, authUser])

  return (
    <main>
        { loading ? <div className="wrap"><Loading /></div> : 
          !course ? <NotFound item="course" /> :
          <>
            <ActionsBar 
              id={id} 
              handleDelete={handleDelete} 
              ownedByUser={ownedByUser}
            />
            <div className="wrap">
              <h2>Course Detail</h2>
              <CourseDetailForm {...course}/>
            </div>
          </>
        }
    </main>
  );
};

export default CourseDetail;