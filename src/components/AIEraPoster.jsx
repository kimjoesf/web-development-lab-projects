const AIEraPoster = () => {
  return (
    <div style={{width:"85%", minHeight:"75%", backgroundColor:"#202030", borderRadius:25, display:"flex", padding:20, alignItems:"center"}}>
     <div style={{width:"40%",height:"65%",display:"flex",alignItems:"flex-start",flexDirection:"column",color:"white", textAlign:"start", gap:7}}>
      <p style={{ fontWeight: "bold", fontSize: 36, margin: 0 }}>Reimagine your career in the AI era</p>
      <p style={{fontWeight:"lighter" ,color:"#bbb",fontSize:17 ,margin: 0 }}>Future-proof your skills with Personal Plan. Get access to a variety of fresh content from real-world experts.</p>
      <div style={{width:"100%", height:"fit-content"}}>
        <div style={{display:"flex", width:"100%",justifyContent:"center", gap:94, marginBottom:10}}>
          <div  style={{display:"flex", gap:3, alignItems:"center"}}>
          <img src="/assets/AIEraPoster/stars.png" alt="stars icon" style={{width:"41px", height:"31px"}} />
          <p style={{color:"white",fontSize:17 ,margin: 0 }}>Learn AI and more</p>
          </div>
          <div  style={{display:"flex", gap:3, alignItems:"center"}}>
          <img src="/assets/AIEraPoster/trophy.png" alt="trophy icon" style={{width:"43px", height:"33px"}} />
          <p style={{color:"white",fontSize:17 ,margin: 0 }}>Prep for a certification</p>
          </div>
        </div>
        <div style={{display:"flex", width:"100%",justifyContent:"space-between"}}>
          <div style={{display:"flex", width:"100%",justifyContent:"center", gap:50, marginBottom:10}}>
          <div  style={{display:"flex", gap:3, alignItems:"center"}}>
          <img src="/assets/AIEraPoster/message.png" alt="message icon" style={{width:"41px", height:"31px"}} />
          <p style={{color:"white",fontSize:17 ,margin: 0 }}>Practice with AI coaching</p>
          </div>
          <div  style={{display:"flex", gap:3, alignItems:"center"}}>
          <img src="/assets/AIEraPoster/light.png" alt="light icon" style={{width:"43px", height:"33px"}} />
          <p style={{color:"white",fontSize:17 ,margin: 0 }}>Advance your career</p>
          </div>
        </div>
        </div>
      </div>
      <div style={{width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",marginLeft:20, marginTop:15,gap:3}}>
       <button style={{color:"#202030", fontWeight:"bold", width:"37%", height:"40px", borderRadius:5, cursor:"pointer"}}>Learn More</button>
       <p style={{fontWeight:"lighter" ,color:"#bbb"  ,margin: 0 }}>Starting at E£204.00/month</p>
       </div>
     </div>
     <div style={{height:"95%",display:"flex", flex:1, justifyContent:"center", alignItems:"center"}}>
       <img style={{width:"93%", height:"93%"}} src="/assets/AIEraPoster/2.png" alt="2" />
     </div>
    </div>
  )
}

export default AIEraPoster