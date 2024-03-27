import { Button } from "react-bootstrap";

function FormToggle({
  showForm,
  onShowExistingCourseForm,
  onShowNewCourseForm,
}) {
  return (
    <div className="d-flex gap-2 mb-5 justify-content-center">
      <Button
        style={{
          transition: "all 0.3s ease-in-out",
          width: showForm === "existing" ? "50%" : "25%",
          height: "50px",
          backgroundColor: showForm === "existing" ? "#BDA1CC" : "transparent",
          borderColor: "#BDA1CC",
          color: "#000",
        }}
        onClick={onShowExistingCourseForm}
      >
        Add Video
      </Button>
      <Button
        style={{
          transition: "all 0.3s ease-in-out",
          width: showForm === "new" ? "50%" : "25%",
          height: "50px",
          backgroundColor: showForm === "new" ? "#BDA1CC" : "transparent",
          borderColor: "#BDA1CC",
          color: "#000",
        }}
        onClick={onShowNewCourseForm}
      >
        Create Course
      </Button>
    </div>
  );
}

export default FormToggle;
