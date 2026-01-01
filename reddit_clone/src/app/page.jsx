"use client"
import FilterBar from "@/components/home/FilterBar";
import MiniPost from "@/components/home/MiniPost";
import Post from "@/components/home/Post";
import RecentPostsView from "@/components/home/RecentPostsView";
import useSettingPinned from "@/store/settingPinStore";
import { Flex } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

 const page = () => {
  const data = [1,2,3,4,5,6,7,8,9];
  const [posts, setPosts] = useState([]); 
  const { isSettingPinned } = useSettingPinned();    
  const [page , setPage] = useState(1);
  const[ comments , setComments ]= useState([]);
  const scrollContainerRef = useRef(null);
  const [skip,setSkip] = useState(0);

  useEffect(() => {
  const container = scrollContainerRef.current;
  if (!container) return;

  const handleScroll = () => {
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 5) {
      setPage(prev => prev + 1);  
    }
  };
  container.addEventListener("scroll", handleScroll);
  return () => container.removeEventListener("scroll", handleScroll);
}, []);


 useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/getPosts",{
          params: { skip }
        });
        setPosts(prev => [...prev, ...res.data]);
        setSkip(prev=>prev+10) 
      } catch (error) {
        console.log("error in fetching posts", error);
      }
    };

    fetchPosts();
  }, [page]);

  return (
  
    <div ref={scrollContainerRef} style={{width:"100vw", height:"100vh", display:"flex", justifyContent:"center", overflow:"hidden auto"}}>
        
        <div style={{width:"75%", minheight:"100%",display:"flex",marginRight:isSettingPinned?"130px":0,transition: "margin-right 0.3s ease-in-out"}}>
        
         <div style={{width:"70%", minheight:"100%", display:"flex", flexDirection:"column"}}>
          <div style={{width:"100%", minHeight:true?"max-content":"270px", overflow:"auto hidden",scrollBehavior:"smooth", display:"flex",alignItems:"center",gap:13,padding:2}} className={"hidden-scrollbar"}>
           {true?(<FilterBar/>):data.map((e)=>(
                 <MiniPost key={e}/>
           ))}
          </div>

          <div style={{width:"100%",flex:1, alignSelf:"flex-start"}}> 
            {posts.map((post)=>(
              <React.Fragment key={post.id}>
              <Post post={post} comments={comments} setComments={setComments}/>
              <Flex width={"100%"} borderTop={"0.11px solid #333"} mb={2} mt={2}/>
              </React.Fragment>
              ))}
          </div>
        </div>

        <div style={{flex:"1", color:"white",padding:15, overflow:"hidden"}}>
           <RecentPostsView/>
        </div>
      </div>
    </div>
  )
}

export default page;
