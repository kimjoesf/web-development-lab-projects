import { useState } from "react";
import { GrLanguage } from "react-icons/gr";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";

const Header = () => {
    const [onFocus,setOnFocus] = useState(false);
    const [onCartHover,setOnCartHover] = useState(false);
    const [onInputHover,setOnInputHover] = useState(false);
  return (
      <div style={{display: "flex", backgroundColor: "white", padding: 10, alignItems: "center", justifyContent: "center", boxShadow:"0 4px 6px rgba(3,3,3,0.1)"}}>
          <div style={{ width: "98%", display: "flex", gap: 15, alignItems: "center" }}>
              <div style={{ width: "7%" }}><img width={"100%"} style={{ verticalAlign: "text-bottom" }} src="/assets/udemyIcon.png" /></div>
              <div style={{ width: "fit-content", cursor: "pointer", padding: 9, borderRadius: 3, color: "grey", fontWeight: "normal", marginBottom: 5, fontSize: "14px" }} className="text-hover">Explore</div>
              <div style={{ width: "45%", height: "35px", display: "flex", justifyContent: "center", alignItems: "center", gap: 5, border: "1px solid", borderColor: onFocus ? "#6C2BD9" : "grey", padding: 8, borderRadius: 30, backgroundColor:onInputHover && !onFocus?"rgba(1,1,1,0.05)":"transparent"}}>
                  <IoIosSearch size={"21px"} color={"grey"} cursor={"not-allowed"} />
                  <input type="text" placeholder={"Search for anything"} style={{ width: "100%", height: "100%", border: "none", outline: "none", fontSize: "14px",backgroundColor:onFocus?"white":"transparent" }} onFocus={() => setOnFocus(true)} onBlur={() => setOnFocus(false)} onMouseEnter={()=>setOnInputHover(true)} onMouseLeave={()=>setOnInputHover(false)} />
              </div>
              <div style={{ width: "fit-content", cursor: "pointer", padding: 9, borderRadius: 3, color: "grey", fontWeight: "normal", marginBottom: 5, fontSize: "14px", textWrap:"nowrap"}} className="text-hover">Plans & Pricing</div>
              <div style={{ width: "fit-content", cursor: "pointer", padding: 9, borderRadius: 3, color: "grey", fontWeight: "normal", marginBottom: 5, fontSize: "14px", textWrap:"nowrap"  }} className="text-hover">Udemy Business</div>
              <div style={{ width: "fit-content", cursor: "pointer", padding: 9, borderRadius: 3, color: "grey", fontWeight: "normal", marginBottom: 5, fontSize: "14px", textWrap:"nowrap"  }} className="text-hover">Teach on Udemy</div>
              <div style={{ width: "fit-content", cursor: "pointer", padding: 9, borderRadius: 3, backgroundColor: onCartHover ? "rgba(0, 0, 0, 0.1)" : "transparent", fontWeight: "normal", marginBottom: 5, fontSize: "14px" }} onMouseEnter={() => setOnCartHover(true)} onMouseLeave={() => setOnCartHover(false)}><MdOutlineShoppingCart size={"21px"} color={onCartHover ? "#8a2be2" : "grey"} />
              </div>
              <button style={{ width: "6%", height: "41px", borderRadius: 4, color: "#6C2BD9", backgroundColor: "transparent", fontWeight: "bold", fontSize: 14, border: "1px solid #6C2BD9", padding: 0, cursor: "pointer" }} className={"btn-hover-transparent"}>Log in</button>
              <button style={{ width: "6%", height: "41px", borderRadius: 4, color: "white", backgroundColor: "#6C2BD9", fontWeight: "bold", fontSize: 14, border: "none", padding: 0, cursor: "pointer" }} className={"btn-hover-purple"}>Sign up</button>
              <div style={{ width: "fit-content", cursor: "pointer", padding: 9, borderRadius: 3,border:"1px solid #6C2BD9",fontWeight: "normal", marginBottom: 5, fontSize: "14px", display:"flex", justifyContent:"center", alignItems:"center"}} className={"btn-hover-transparent"}><GrLanguage color={"grey"} size={"16px"}/></div>
          </div>
      </div>
  )
}

export default Header;