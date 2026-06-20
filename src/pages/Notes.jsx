import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function Notes() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const userEmail =
    localStorage.getItem("personalUser");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const { data } = await supabase
      .from("notes")
      .select("*")
      .eq("user_email", userEmail);

    setNotes(data || []);
  };

  const addNote = async () => {
    if (!note) return;

    await supabase
      .from("notes")
      .insert([
        {
          user_email: userEmail,
          note,
        },
      ]);

    setNote("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await supabase
      .from("notes")
      .delete()
      .eq("id", id);

    fetchNotes();
  };

  return (
    <div className="container-fluid p-3 p-md-4">
      <h1>📝 Notes</h1>

      <textarea
        className="form-control mb-3"
        rows="4"
        value={note}
        onChange={(e) =>
          setNote(e.target.value)
        }
      />

      <button
        className="btn btn-primary mb-4"
        onClick={addNote}
      >
        Save Note
      </button>

      {notes.map((n) => (
        <div
          key={n.id}
          className="card p-3 mb-3"
        >
          <p>{n.note}</p>

          <button
            className="btn btn-danger"
            onClick={() =>
              deleteNote(n.id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Notes;