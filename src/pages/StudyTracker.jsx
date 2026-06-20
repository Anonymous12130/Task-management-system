import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function StudyTracker() {
  const [subject, setSubject] = useState("");
  const [hours, setHours] = useState("");

  const [subjects, setSubjects] =
    useState([]);

  const userEmail =
    localStorage.getItem("personalUser");

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const { data } = await supabase
      .from("study_tracker")
      .select("*")
      .eq("user_email", userEmail);

    setSubjects(data || []);
  };

  const addSubject = async () => {
    if (!subject || !hours) return;

    await supabase
      .from("study_tracker")
      .insert([
        {
          user_email: userEmail,
          subject,
          hours,
        },
      ]);

    setSubject("");
    setHours("");

    fetchSubjects();
  };

  const deleteSubject = async (
    id
  ) => {
    await supabase
      .from("study_tracker")
      .delete()
      .eq("id", id);

    fetchSubjects();
  };

  return (
    <div className="container-fluid p-3 p-md-4">

      <h1>
        📚 Study Tracker
      </h1>

      <input
        className="form-control mb-2"
        placeholder="Subject"
        value={subject}
        onChange={(e) =>
          setSubject(e.target.value)
        }
      />

      <input
        type="number"
        className="form-control mb-3"
        placeholder="Hours"
        value={hours}
        onChange={(e) =>
          setHours(e.target.value)
        }
      />

      <button
        className="btn btn-primary mb-4"
        onClick={addSubject}
      >
        Add Subject
      </button>

      {subjects.map((s) => (
        <div
          key={s.id}
          className="card p-3 mb-3"
        >
          <h4>
            {s.subject}
          </h4>

          <p>
            Study Hours:
            {s.hours}
          </p>

          <button
            className="btn btn-danger"
            onClick={() =>
              deleteSubject(
                s.id
              )
            }
          >
            Delete
          </button>
        </div>
      ))}

    </div>
  );
}

export default StudyTracker;