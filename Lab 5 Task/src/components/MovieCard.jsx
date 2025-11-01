import { useState } from "react";

const MovieCard = ({ movie, onRate, onComment, onRemove }) => {

  const stars = "⭐".repeat(movie.rating);
  const [comment, setComment] = useState("");
  const [tempComment, setTempComment] = useState("");
  const saveComment = () => {
    if (tempComment) {
      onComment(movie.id, tempComment);
      setComment(tempComment);
    }
  };

  return (
    <div style={{ backgroundColor: "#1a1a1a", padding: "16px", borderRadius: "10px", margin: "12px 0", 
      boxShadow: "0 4px 12px rgba(0,0,0,0.4)", transition: "transform 0.2s ease", display:"flex", flexDirection:"column"}}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} >
      <h3 style={{ color: "white", margin: "0 0 8px" }}>{movie.title}</h3>
      <p style={{ color: "white", fontWeight: "bold" }}> {stars || "No rating"}</p>

      <div style={{ margin: "10px 0" }}>
        <button  onClick={() => onRate(movie.id, +1)} style={btnStyle}>  +⭐ </button>
        <button onClick={() => onRate(movie.id, -1)} style={btnStyle} disabled={movie.rating === 0}>  -⭐ </button>
      </div>

        <input value={tempComment} onChange={(e) => setTempComment(e.target.value)} placeholder={"Write a short review..."} 
        style={{width: "100%", padding: "8px", background: "#333", color: "white",  border: "1px solid #555", borderRadius: "6px", display:comment? "none":"inline", alignSelf:"center"}}/>

      {movie.comment && (
        <p style={{ fontStyle: "italic", color: "#ccc", marginTop: "8px" }}>
          “{movie.comment}”
        </p>
      )}
      <div style={{width:"100%"}}>
        <button
          onClick={() => onRemove(movie.id)}
          style={{ ...btnStyle, marginTop: "15px", backgroundColor: "#333", color: "white"}}>
          Remove
        </button>
        <button onClick={saveComment} style={{marginTop: "6px", padding: "6px 10px", backgroundColor: "#333", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight:"bold", marginLeft:"5px", display:comment?"none":"inline"}}>
            Save Comment
        </button>
      </div>
    </div>
  );
};
const btnStyle = {
  padding: "6px 12px",
  margin: "0 4px",
  backgroundColor: "#333",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default MovieCard;