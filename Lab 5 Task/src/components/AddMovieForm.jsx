import { useState } from "react";

const AddMovieForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");

  const submit = () => {
    if (title.trim()) {
      onAdd(title);
      setTitle("");
    }
  };

  return (
    <div
      style={{ display: "flex", gap: "10px", margin: "30px 0"}}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Add a movie..."
        style={{
 flex: 1, padding: "12px", backgroundColor: "#222", color: "white", border: "1px solid #555", borderRadius: "6px"}}/>
      <button
        onClick={submit}
        style={{ padding: "12px 24px", backgroundColor: "#e50914", color: "white", border: "none", borderRadius: "6px", 
          fontWeight: "bold", cursor: "pointer", transition: "background 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#b0060e")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#e50914")}
      >
        Add
      </button>
    </div>
  );
};

export default AddMovieForm;