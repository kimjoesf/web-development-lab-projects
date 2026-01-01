"use client"
import CommentInput from "@/components/commentsPage/CommentInput";
import CommunityInfo from "@/components/commentsPage/CommunityInfo";
import FilterBar from "@/components/home/FilterBar";
import MiniPost from "@/components/home/MiniPost";
import Post from "@/components/home/Post";
import RecentPostsView from "@/components/home/RecentPostsView";
import Comment from "@/components/postPage/Comment";
import useSettingPinned from "@/store/settingPinStore";
import { Flex, Input } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

 const page = ({post}) => {
  const data = [1,2,3,4,5,6,7,8,9];
  const [posts, setPosts] = useState([1,2,3]); 
  const [endOfPostsReached,setEndOfPostsReached] = useState(false);
  const { isSettingPinned } = useSettingPinned()    
  const [page , setPage] = useState(1);
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await axios.get("/api/getPosts");
  //       setPosts(prev => [...prev, ...response.data]); 
  //     } catch (error) {
  //       console.log("error in fetching posts", error);
  //     }
  //   };

  //   fetchPosts();
  // }, [page]);

  return (
  
    <div style={{width:"100vw", height:"100vh", display:"flex", justifyContent:"center", overflow:"hidden auto", border:"2px solid blue"}}>  
        <div style={{width:"75%", minheight:"100%", border:"2px solid blue", display:"flex",marginRight:isSettingPinned?"130px":0,transition: "margin-right 0.3s ease-in-out"}}>    
         <div style={{width:"70%", minheight:"100%", display:"flex", flexDirection:"column"}}>
          <div style={{width:"100%",flex:1, alignSelf:"flex-start"}}> 
             <Comment/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page;
