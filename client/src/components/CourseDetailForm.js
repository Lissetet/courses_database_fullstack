import React from 'react';
import ReactMarkdown from 'react-markdown';

const CourseDetailForm = (props) => {
  const { title, description, estimatedTime, materialsNeeded, user } = props;
  const name = `${user.firstName} ${user.lastName}`;

  return (
    <form>
      <div className="main--flex">
        <div>
          <h3 className="course--detail--title">Course</h3>
          <h4 className="course--name">{title}</h4>
          <p>By {name}</p>
          <ReactMarkdown children={description} />
        </div>
        <div>
          <h3 className="course--detail--title">Estimated Time</h3>
          <p>{estimatedTime}</p>

          <h3 className="course--detail--title">Materials Needed</h3>
          <ReactMarkdown 
            children={materialsNeeded}
            components={{ ul: ({node, ...props}) => {
              // Add a className to the ul element
              return <ul {...props} className="course--detail--list"/>
            }}}
          />
        </div>
      </div>
    </form>
  )

}

export default CourseDetailForm;