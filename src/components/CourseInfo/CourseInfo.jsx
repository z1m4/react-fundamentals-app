// This component shows information about the current chosen course.

// Module 1.
// * Use template to show course's information:
// ** ID of course;
// ** Title;
// ** Description;
// ** Duration;
// ** List of authors;
// ** Creation date;
// * use <Button /> component to replace CourseInfo component with Courses component
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-1/home-task/components#course-info

// Module 2.
// * render component by route '/courses/:courseId'
// * use 'useParam' hook to get course id, remove prop 'showCourseId'
// * remove 'onBack' prop
// * use '<Link />' instead <Button /> component for 'BACK' button
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-2/home-task/components#course-info

// Module 3.
// * remove props 'coursesList', 'authorsList'
// * use selectors from store/selectors.js to get coursesList, authorsList from store

import React from "react";
import { formatCreationDate, getCourseDuration } from "../../helpers";
import { Button } from "../../common/Button/Button";
import styles from "./styles.module.css";

export const CourseInfo = ({
  coursesList,
  authorsList,
  showCourseId,
  onBack,
}) => {
  const course = coursesList.find((course) => course.id === showCourseId);

  if (!course) {
    return <p>Course not found.</p>;
  }

  const courseAuthors = course.authors
    .map((authorId) => {
      const author = authorsList.find((author) => author.id === authorId);
      return author ? author.name : null;
    })
    .filter(Boolean);

  return (
    <div className={styles.container} data-testid="courseInfo">
      <div className={styles.header}>
        <h1>{course.title}</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <p className={styles.description}>{course.description}</p>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.metaData}>
            <p>
              <span className={styles.label}>ID:</span>
              <span>{course.id}</span>
            </p>
            <p>
              <span className={styles.label}>Duration:</span>
              <span>{getCourseDuration(course.duration)}</span>
            </p>
            <p>
              <span className={styles.label}>Created:</span>
              <span>{formatCreationDate(course.creationDate)}</span>
            </p>

            <div className={styles.authorsSection}>
              <p className={styles.label}>Authors:</p>
              <ul className={styles.authorsList}>
                {courseAuthors.length > 0 ? (
                  courseAuthors.map((name, index) => (
                    <li key={index}>{name}</li>
                  ))
                ) : (
                  <li>No authors available</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <Button
          buttonText="Back to courses"
          handleClick={onBack}
          data-testid="backButton"
        />
      </div>
    </div>
  );
};
