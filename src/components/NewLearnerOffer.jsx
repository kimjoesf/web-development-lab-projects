import { useEffect, useState } from "react"

const NewLearnerOffer = () => {
const [timer,setTimer] = useState(3 * 3600 + 31 * 60 + 5); 
useEffect(()=>{
  const interval = setInterval(()=>setTimer(prev =>prev>0 ?prev-1: 0 ),1000);
  return () => clearInterval(interval);
},[])
  
  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;

return (
    <section style={{width:"100vw",display:"flex",justifyContent:"center", alignItems:"center", backgroundColor:"#C2E9EA", gap:15}}>
    <div>
    <p><span style={{fontWeight:"bold"}}>New-learner offer | </span> Courses from E£259.99. Click button to see savings. </p>
    <p style={{fontWeight:500, fontSize:18,marginTop:-15}}>Ends in {hours}h {minutes}m {seconds}s</p>
    </div>
    <button style={{width:"8.5%",height:"41px",borderRadius:4, color:"white",backgroundColor:"#6C2BD9",fontWeight:"bold",fontSize:14,border:"none",padding:0, cursor:"pointer"}}
    className={"btn-hover-purple"}
    >Click to redeem</button>
  </section>
  )
}

export default NewLearnerOffer