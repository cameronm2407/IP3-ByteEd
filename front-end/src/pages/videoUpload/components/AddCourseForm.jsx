import React, { useState } from "react";
import AddCourse from "./AddCourseFormComponents/AddCourse.jsx";
import AddVideos from "./AddCourseFormComponents/AddVideos.jsx";
import ObjectID from "bson-objectid";

function AddCourseForm() {
  const [courseID] = useState(ObjectID().toString());
  const [showForm, setShowForm] = useState(true);

  return (
    <div>
      {showForm ? (
        <AddCourse setShowForm={setShowForm} courseID={courseID} />
      ) : (
        <AddVideos setShowForm={setShowForm} courseID={courseID} />
      )}
    </div>
  );
}

export default AddCourseForm;
