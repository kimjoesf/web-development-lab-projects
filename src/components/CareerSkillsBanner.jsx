import { MdOutlinePeopleAlt } from "react-icons/md";
import { HiArrowSmallRight } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
const CareerSkillsBanner = () => {
  const data = [{ bg: "/assets/careerSkillsBanner/tablet.png", title: "Generative AI", inrolls: 1.7 }, { bg: "/assets/careerSkillsBanner/trophy.png", title: "IT Certifications", inrolls: 14 }, { bg: "/assets/careerSkillsBanner/diamond.png", title: "Data Science", inrolls: 8.1 }];
  return (
    <div style={{ width: "85%", minHeight: "70%"}}>
      <div style={{ width: "100%", height: "90%", display: "flex", gap: 15, padding: 7, alignItems: "center"}}>
        <div style={{ width: "23%", height: "87%", borderRadius: 20, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", textAlign: "start", padding: 5 }}>
          <p style={{ fontWeight: "bold", fontSize: 30, color: "var(--font-color-grey)", margin: 0 }}>Learn essential career and life skills</p>
          <p style={{ fontWeight: "lighter", fontSize: 15, color: "var(--font-color-grey)" }} >Udemy helps you build in-demand skills fast and advance your career in a changing job market.</p>
        </div>
        <div style={{ flex: 1, height: "100%", display: "flex", gap: 15, padding: 7, alignItems: "center", flexWrap:"wrap" }}>
          {data.map((element, i) => (
            <div key={i} style={{ flex: 1, height: "87%", backgroundImage: `url(${element.bg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", borderRadius: 20, display: "flex", justifyContent: "center" }} >
              <div style={{ width: "80%", height: "30%", backgroundColor: "white", borderRadius: 10, marginTop: "auto", marginBottom: 20, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 7, textAlign: "start", cursor: "pointer" }} className="careerSkillsBannerBox-hover-shadow">
                <div style={{ width: "95%", height: "90%", display: "flex", flexDirection: "column" }}>
                  <div style={{ width: "fit-content", display: "flex", alignItems: "center", gap: 3, borderColor: "#aaa", padding: 2, borderRadius: 5, fontSize: 12, color: "#555" }}>
                    <MdOutlinePeopleAlt size={16} color="#333" />
                    <span>{element.inrolls}M+</span>
                  </div>
                  <h3 style={{ fontWeight: 600, color: "var(--font-color-grey)" }}>Generative AI</h3>
                  <HiArrowSmallRight style={{ marginLeft: "auto", color: "var(--font-color-grey)", flexShrink: 0 }} size={19} />
                </div>
              </div>
            </div>
          ))}

          <div style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center", gap:10}}> 

        
              <div style={{ width: "30px", height: "30px", backgroundColor: "white", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 4px 5px rgba(3,3,3,0.2)", cursor: "pointer", color: "#999", marginRight:15}}> <IoIosArrowBack size={"17px"}/></div>
              <div style={{width:"25px", height:"8px", borderRadius:5, backgroundColor:"#8a2be2"}}></div>
              <div style={{width:"8px", height:"8px", borderRadius:"50%", backgroundColor:"#ddd"}}></div>
              <div style={{width:"8px", height:"8px", borderRadius:"50%", backgroundColor:"#ddd"}}></div>
              <div style={{ width: "30px", height: "30px", backgroundColor: "white", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 4px 5px rgba(3,3,3,0.2)", cursor: "pointer", color: "#999", marginLeft:15}}> <IoIosArrowForward size={"17px"} /></div>
        
          </div>
        </div>
      </div>
    </div>
  )
}

export default CareerSkillsBanner