import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const JobPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/jobs/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch job");
        }

        const data = await res.json();
        setJob(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

   const deleteJob = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:4000/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete job");
      }

      alert("Job successfully deleted");

      // Remove job visually by navigating away
      navigate("/");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Error deleting job. Check console for details.");
    }
  };




  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-details">
      <h2>{job.title}</h2>
      <p>Type: {job.type}</p>
      <p>Description: {job.description}</p>
      <p>Company: {job.company.name}</p>
      <p>Contact Email: {job.company.contactEmail}</p>
      <p>Contact Phone: {job.company.contactPhone}</p>
      <p>Location: {job.location}</p>
      <p>Salary: {job.salary}</p>
      <p>Posted Date: {job.postedDate}</p>
      <Link to={`/edit-job/${id}`}>
        <button>Edit Job</button>
      </Link>
      <button onClick={deleteJob}>Delete Job</button>
    </div>
  );
};

export default JobPage;
