import { useState } from "react";
import { HiArrowSmallRight } from "react-icons/hi2";

 const BottomSlider = () => {
  const [selected, setSelected] = useState("ai");

  const categories = {
    ai: [
      {
        title: "The AI Engineer Course 2025: Complete AI Engineer Bootcamp",
        author: "365 Careers",
        price: "£309.99",
        oldPrice: "£349.99",
        rating: "4.6",
        ratingsCount: "11,778 ratings",
        badge: "Bestseller",
        img: "",
      },
      {
        title: "Intro to AI Agents and Agentic AI",
        author: "365 Careers",
        price: "£309.99",
        oldPrice: "£349.99",
        rating: "4.4",
        ratingsCount: "1,806 ratings",
        badge: "Bestseller",
        img: "",
      },
    ],
    python: [
      {
        title: "Python Complete Bootcamp 2025",
        author: "John Doe",
        price: "£199.99",
        oldPrice: "£279.99",
        rating: "4.7",
        ratingsCount: "20,112 ratings",
        badge: "Bestseller",
        img: "",
      },
    ],
    excel: [
      {
        title: "Microsoft Excel Masterclass",
        author: "Jane Smith",
        price: "£129.99",
        oldPrice: "£199.99",
        rating: "4.5",
        ratingsCount: "9,182 ratings",
        badge: "Bestseller",
        img: "",
      },
            {
        title: "Microsoft Excel Masterclass",
        author: "Jane Smith",
        price: "£129.99",
        oldPrice: "£199.99",
        rating: "4.5",
        ratingsCount: "9,182 ratings",
        badge: "Bestseller",
        img: "",
      },
            {
        title: "Microsoft Excel Masterclass",
        author: "Jane Smith",
        price: "£129.99",
        oldPrice: "£199.99",
        rating: "4.5",
        ratingsCount: "9,182 ratings",
        badge: "Bestseller",
        img: "",
      },
    ],
   agents:[
          {
        title: "Microsoft Excel Masterclass",
        author: "Jane Smith",
        price: "£129.99",
        oldPrice: "£199.99",
        rating: "4.5",
        ratingsCount: "9,182 ratings",
        badge: "Bestseller",
        img: "",
      },
   ],
      marketing:[
          {
        title: "Microsoft Excel Masterclass",
        author: "Jane Smith",
        price: "£129.99",
        oldPrice: "£199.99",
        rating: "4.5",
        ratingsCount: "9,182 ratings",
        badge: "Bestseller",
        img: "",
      },
   ],   
   AWS:[
          {
        title: "Microsoft Excel Masterclass",
        author: "Jane Smith",
        price: "£129.99",
        oldPrice: "£199.99",
        rating: "4.5",
        ratingsCount: "9,182 ratings",
        badge: "Bestseller",
        img: "",
      },
   ]  
  };

  const tabs = [
    { id: "ai", label: "Artificial Intelligence (AI)" },
    { id: "python", label: "Python" },
    { id: "excel", label: "Microsoft Excel" },
    { id: "agents", label: "AI Agens & Agentic AI" },
    { id: "marketing", label: "Digital Marketing" },
    { id: "AWS", label: "Amazon AWS" }
  ];

  return (
  <div style={{width:"85%", minHeight:"75%" , display:"flex", alignItems:"center", textAlign:"start"}}>
    <div style={{fontFamily: "Arial" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        Skills to transform your career and life
      </h1>
      <p style={{ fontSize: "16px", marginBottom: "25px", color: "#555" }}>
        From critical skills to technical topics, Udemy supports your professional development.
      </p>

    
      <div style={{ display: "flex", gap: "25px", marginBottom: "25px" }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelected(t.id)}
            style={{
              color:"var(--font-color-grey)",  
              background: "none",
              border: "none",
              paddingBottom: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight:"bold",
              borderBottom: selected === t.id ? "3px solid black" : "3px solid transparent",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

     
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {categories[selected].map((c, index) => (
          <div
            key={index}
            style={{
              width: "260px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              src={c.img}
              alt={c.title}
              style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "6px" }}
            />

            <h3 style={{ fontSize: "16px", margin: "10px 0" }}>{c.title}</h3>
            <p style={{ color: "#666", fontSize: "14px", marginBottom: "5px" }}>{c.author}</p>

            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span
                style={{
                  background: "#e6f4ea",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
              >
                {c.badge}
              </span>
              <span style={{ fontSize: "14px" }}>⭐ {c.rating}</span>
              <span style={{ color: "#777", fontSize: "12px" }}>{c.ratingsCount}</span>
            </div>

            <div style={{ marginTop: "10px", fontWeight: "bold", fontSize: "16px" }}>{c.price}</div>
            <div style={{ textDecoration: "line-through", fontSize: "13px", color: "#999" }}>
              {c.oldPrice}
            </div>
          </div>
        ))}
      </div>
        <div style={{display:"flex",alignItems:"center",color:"#6C2BD9",fontSize:"14px",fontWeight:"bold", width:"fit-content", marginTop:30, gap:5, cursor:"pointer",padding:10,borderRadius:4}} className="text-hover">Show All {tabs.find(tab => tab.id === selected)?.label}
          <HiArrowSmallRight size={17} />
        </div>
    </div>
    </div>
  );
}

export default BottomSlider ;
