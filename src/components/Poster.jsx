import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";


const poster = ({bg}) => {
  return (
    <div style={{width:"89%",height:"55%",backgroundImage:`url(${bg})`, backgroundSize:"cover", backgroundPosition:"center", backgroundRepeat:"no-repeat",display:"flex", flexShrink:0}}> 
     
       {/* <div style={{width:"fit-content", display:"flex",alignItems:"center" , alignSelf:"center", padding:10}}>
         <div style={{width:"45px",height:"45px",backgroundColor:"white", borderRadius:"50%", display:"flex", justifyContent:"center", alignItems:"center", boxShadow:"0 4px 5px rgba(3,3,3,0.2)", cursor:"pointer"}}> <IoIosArrowBack size={"21px"} /></div>
       </div> */}

      <div style={{width:"30%",height:"fit-content",backgroundColor:"white", padding:20, borderRadius:4, justifyContent:"space-evenly", alignSelf:"center", display:"flex", flexDirection:"column", gap:20, textWrap:"wrap", textAlign:"start",marginLeft:60 ,boxShadow:"0 6px 6px rgba(3,3,3,0.2)"}}>
        <p style={{margin:0,fontSize:32, fontWeight:600, color:"#333"}}>Master tomorrow's skills today</p>
        <p style={{margin:0,fontSize:"17px",fontWeight:"lighter"}}>Power up your AI, career, and life skills with the most up-to-date, expert-led learning.</p>
        <div style={{width:"fit-content",display:"flex", gap:17, alignItems:"center"}}>
        <button style={{width: "120px", height: "50px", borderRadius: 4, color: "white", backgroundColor: "#6C2BD9", fontWeight: "bold", fontSize: 14, border: "none", padding: 0, cursor: "pointer"}} className={"btn-hover-purple"}>Get started</button>
        <button style={{ width: "120px", height: "50px", borderRadius: 4, color: "#6C2BD9", backgroundColor: "transparent", fontWeight: "bold", fontSize: 14, border: "1px solid #6C2BD9", padding: 0, cursor: "pointer" }} className={"btn-hover-transparent"}>Learn AI</button>
        </div>
      </div>  

        {/* <div style={{width:"fit-content", display:"flex",alignItems:"center", marginLeft:"auto", alignSelf:"center", padding:10}}>
         <div style={{width:"45px",height:"45px",backgroundColor:"white", borderRadius:"50%", display:"flex", justifyContent:"center", alignItems:"center", boxShadow:"0 4px 5px rgba(3,3,3,0.2)", cursor:"pointer"}}> <IoIosArrowForward size={"21px"} /></div>
       </div> */}

    </div>
  )
}

export default poster;