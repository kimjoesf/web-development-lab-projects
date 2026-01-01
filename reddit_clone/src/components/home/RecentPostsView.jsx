"use client"
import useRecentViewedPostsStore from "@/store/recentViewedPosts";
import { Avatar, Image } from "@chakra-ui/react";
import { useUser } from "@clerk/nextjs";

const RecentPostsView = () => {
  const {recentViewedPosts, clearRecentViewedPosts}= useRecentViewedPostsStore();
  const {user} = useUser();

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return new Intl.RelativeTimeFormat("en", {
        numeric: "auto",
      }).format(-count, interval.label);
    }
  }

  return "just now";
}

if(!user) return;
  return (
    <div style={{ width: "19%", height: "430px", borderRadius: 17, backgroundColor: "black", marginTop: 7, position: "fixed",padding:15, display:recentViewedPosts.length===0?"none":"block"}}>
       <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", width:"100*", height:"fit-content"}}>
        <p style={{fontFamily:"system-ui", fontSize:12, fontWeight:"bold",color:"#6e848dff"}}> RECENT POSTS </p>
        <p style={{fontFamily:"system-ui", fontSize:14,fontWeight:"bold",color:"#4380e2ff", cursor:"pointer"}} onClick={clearRecentViewedPosts}>Clear</p>
       </div>
        {recentViewedPosts.map((post)=>(
            <div style={{width:"100%", height:"fit-content", borderBottom:"0.1px solid #333",marginBottom:3}} key={post.id}>
               
                <div style={{width:"100%", padding:10, display:"flex",color:"#6e848dff"}}>
                  <div>
                   <div style={{display:"flex", gap:5, alignItems:"center",color:"#6e848dff",fontSize:12,marginBottom:2}}>
                    <Avatar size={"xs"} src={post?.community?.imageUrl}/>
                    <p >{"r/"+post?.community?.name} <span> ● {timeAgo(post.publishedAt)}</span></p>
                   </div>
                   <p style={{fontSize:14, fontWeight:"bold"}}>{post?.title}</p>
                   </div>
                </div>
                <div style={{width:"100%", display:"flex", alignItems:"center",paddingLeft:10, marginTop:-3}}>
                  <p style={{fontSize:12,color:"#6e848dff",margin:0}}>{post?.body}</p>    
                </div>   
            </div>
        ))}
    </div>
  )
}

export default RecentPostsView ;