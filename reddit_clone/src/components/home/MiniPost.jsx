import { Avatar } from "@chakra-ui/react"

const MiniPost = ({postImg,postTitle,postDesc,authorName,authorPic}) => {
  return (
    <div style={{width:"27%",height:"90%",flexShrink:0, borderRadius:10, backgroundImage:`url(${postImg})`,backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat", display:"flex", flexDirection:"column",justifyContent:"flex-end", alignItems:"center",color:"white",gap:4,cursor:"pointer", overflow:"hidden"}}> 
    <p style={{fontSize:23,fontWeight:"bold"}}>title nothing to say</p>
    <p style={{width:"100%",fontSize:16, textWrap:"nowrap"}}>nothing to say is a title for what we call bla bla bla</p>
    <div style={{width:"100%",alignSelf:"flex-start",gap:5, alignItems:"center",display:"flex",marginTop:3}}>
        <Avatar size={"xs"} src={"/test.png"}/>
        <p style={{fontSize:9,marginRight:3}}>author name</p>
        <p style={{color:"#6e848dff",fontSize:12}}>and more</p>
    </div>
    </div>
  )
}

export default MiniPost;