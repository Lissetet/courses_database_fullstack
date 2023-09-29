import { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const CourseDetailForm = ({course, onSubmit, action}) => {
  const { authUser } = useContext(UserContext);
  const name = `${authUser?.firstName} ${authUser?.lastName}`;
  const navigate = useNavigate();

  const title = useRef(null);
  const description = useRef(null);
  const time = useRef(null);
  const materials = useRef(null);

  const onCancel = () => {
    course?.id ? navigate(`/courses/${course.id}`) : navigate('/');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const course = {
      title: title.current.value,
      description: description.current.value,
      estimatedTime: time.current.value || null,
      materialsNeeded: materials.current.value || null
    }
    onSubmit(course);
  }

  return (
    <form>
      <div className="main--flex">
        <div>
          <label htmlFor="courseTitle">Course Title</label>
          <input 
            id="courseTitle" 
            name="courseTitle" 
            type="text" 
            defaultValue={course?.title} 
            ref={title}
          />
          <p>By {name}</p>

          <label htmlFor="courseDescription">Course Description</label>
          <textarea 
            id="courseDescription" 
            name="courseDescription" 
            ref={description} 
            defaultValue={course?.description}
          />
        </div>
        <div>
          <label htmlFor="estimatedTime">Estimated Time</label>
          <input 
            id="estimatedTime" 
            name="estimatedTime" 
            type="text" 
            defaultValue={course?.estimatedTime} 
            ref={time}
          />

          <label htmlFor="materialsNeeded">Materials Needed</label>
          <textarea 
            id="materialsNeeded" 
            name="materialsNeeded" 
            ref={materials} 
            defaultValue={course?.materialsNeeded}
          />
        </div>
      </div>
      <button className="button" onClick={handleSubmit} type="submit">
        {action} Course
      </button>
      <button className="button button-secondary" onClick={onCancel}>Cancel</button>
    </form>
  )

}

export default CourseDetailForm;