"use client"
import { Avatar, Button, Flex, Text, useDisclosure } from "@chakra-ui/react"
import ThreeDotsDropDownMenu from "../pages/ThreeDotsDropDownMenu"
import ShareButton from "../post/ShareButton"
import useCurrentPostStore from "@/store/postStore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import useRecentViewedPostsStore from "@/store/recentViewedPosts"
import useUserCommunitiesStore from "@/store/userComunitiesStore"
import PostSummary from "../post/PostSummary"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

 
 

const Post = ({post,setComments:externalSetComments}) => {
 const[ votes , setVotes]= useState();
 const[ userVoteStatus , setUserVoteStatus]= useState();
 const[ comments , setComments ]= useState([]);    
 const { setPost } = useCurrentPostStore();
 const {addRecentViewedPost} = useRecentViewedPostsStore();
 const{ userCommunities, addUserCommunity} = useUserCommunitiesStore();
 const { isOpen, onOpen, onClose } = useDisclosure();
 const router = useRouter();
 const name= post?.community?.id ? ("r/"+post?.community?.name): ("r/"+post?.author?.name);
 const imageUrl=post?.community?.id ? (post?.community?.imageUrl):(post?.author?.imageUrl);
 
  useEffect(() => {
    const getPostVotes = async (postId) => {
      const res = await axios.get("/api/getPostVotes", {
        params: { postId }
      });
      setVotes(res.data);
    }
    const getUserPostVoteStatus = async (postId) => {
      const res = await axios.get("/api/getUserPostVoteStatus", {
        params: { postId }
      });
      setUserVoteStatus(res.data);
    };

    const getPostComments = async (postId) => {
      const res = await axios.get("/api/getPostComments", {
        params: { postId }
      });
      setComments(res.data);
      externalSetComments?.(res.data);
    };
  if(post.id){
    getPostVotes(post?.id);
    getUserPostVoteStatus(post?.id);
    getPostComments(post?.id);}

  }, [post])

 const handleClickPost = () =>{
  setPost(post);
  addRecentViewedPost(post);  
  router.push(`/r/${post?.community?.name}/${post?.id}`);
 }

 const handleClickUpVote = async () => {
     setVotes((prev) => {
       // no previous vote
       if (!userVoteStatus) {
         setUserVoteStatus("upvote");
         return {
           ...prev,
           upvotes: prev.upvotes + 1,
           netScore: prev.netScore + 1,
         };
       }

       // already upvoted → remove vote
       if (userVoteStatus === "upvote") {
         setUserVoteStatus(null);
         return {
           ...prev,
           upvotes: prev.upvotes - 1,
           netScore: prev.netScore - 1,
         };
       }

       // was downvoted → switch
       if (userVoteStatus === "downvote") {
         setUserVoteStatus("upvote");
         return {
           ...prev,
           upvotes: prev.upvotes + 1,
           downvotes: prev.downvotes - 1,
           netScore: prev.netScore + 2,
         };
       }

       return prev;
     });
    const res = await axios.post("/api/setPostVote", { postId:post?.id, voteType: "upvote" });
     setVotes(res.data);
 }

  const handleClickDownVote = async () => {
    setVotes((prev) => {
      if (!userVoteStatus) {
        setUserVoteStatus("downvote");
        return {
          ...prev,
          downvotes: prev.downvotes + 1,
          netScore: prev.netScore - 1,
        };
      }

      if (userVoteStatus === "downvote") {
        setUserVoteStatus(null);
        return {
          ...prev,
          downvotes: prev.downvotes - 1,
          netScore: prev.netScore + 1,
        };
      }

      if (userVoteStatus === "upvote") {
        setUserVoteStatus("downvote");
        return {
          ...prev,
          upvotes: prev.upvotes - 1,
          downvotes: prev.downvotes + 1,
          netScore: prev.netScore - 2,
        };
      }

      return prev;
    });
     const res = await axios.post("/api/setPostVote", { postId:post?.id, voteType: "downvote" });
     setVotes(res.data);
  };


  const  timeAgo= (dateString)=> {
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

  const handleJoiningCommunity=async()=>{
    if(!post.community.id){
      console.log("community id is needed"); 
      return;
    }
    const res = await axios.post("/api/joinCommunity",{
      communityId:post?.community?.id
    });
    addUserCommunity(res.data);
  }
 
    console.log(userCommunities);
    console.log(post?.community?.id);


  return (
    <div className="hover-white-alpha" style={{width:"100%", height:"fit-content", borderRadius:7, display:"flex", padding:5, flexDirection:"column",cursor:"pointer"}} onClick={handleClickPost}> 
    
    {/* HEADER */}
    <div style={{width:"100%", display:"flex", gap:5, alignItems:"center", color:"#bbb"}} onClick={(e)=>e.stopPropagation()}>
      <Avatar size={"xs"} src={imageUrl}/>
      <p>{name}<span style={{color:"#6e848dff"}}> ● {timeAgo(post.publishedAt)}</span></p>
      <div style={{display:"flex", gap:5, justifySelf:"flex-end", marginLeft:"auto", padding:3, alignItems:"center"}}>
        <Button width={"45px"} height={"18px"} fontSize={12} bgColor={"#135accff"} color={"white"} _hover={{bgColor:"blue.400"}} borderRadius={11} padding={2}  
        display={userCommunities.some(community=>community?.id===post?.community?.id)?"none":"block"} onClick={handleJoiningCommunity}>Join</Button>
         <ThreeDotsDropDownMenu onOpen={onOpen}/>
      </div>
    </div>

    {/* BODY */}
    <div style={{width:"100%", color:"#6e848dff"}}>
       <p style={{fontSize:23,fontWeight:"bold" ,fontFamily:"system-ui"}}>{post?.title}</p>
       <p style={{fontSize:16, textWrap:"wrap"}}>{post?.body}</p>   
     
       {/* <div style={{width:"100%", flex:1, padding:15 }}>
         {post?.mediaURLs?.map((url,i)=>(
          post.mediaTypes[i]==="video"?(<video key={url} src={url} style={{width:"100%", height:"100%"}} controls/>):(<img key={url} src={url} style={{width:"100%", height:"100%"}}/>)
        ))}
       </div> */}
        <div style={{ width: "100%", flex: 1, padding: 15 }}>
          {post?.mediaURLs?.length > 0 && (
            <Slider
              dots={post.mediaURLs.length > 1}
              infinite={false}
              speed={300}
              slidesToShow={1}
              slidesToScroll={1}
              arrows={post.mediaURLs.length > 1}
            >
              {post.mediaURLs.map((url, i) => (
                post.mediaTypes[i] === "video" ?
                  (<video key={url} src={url} style={{ width: "100%", maxHeight: 500 }} controls />) :
                  (<img key={url} src={url} style={{ width: "100%", maxHeight: 500, objectFit: "contain" }} />)
              ))}
            </Slider>
          )}
        </div>

    
    </div>

    {/*FOOTER  */}
      <div style={{ width: "100%",padding:15, display:"flex", gap:13}} onClick={(e)=>e.stopPropagation()}> 
     
      {/*  Votes  */}
      <Flex width={"fit-content"} height={"29px"} alignItems={"center"} borderRadius={20} cursor={"pointer"} bgColor={userVoteStatus==="upvote"?"#e83f01ff":userVoteStatus==="downvote"?"purple.500":"#323D41"} color={"white"}>     
          <Flex  width={"29px"} height={"29px"} justifyContent={"center"} alignItems={"center"} cursor={"pointer"} _hover={{bgColor:"#3f4d52ff",color:"#e83f01ff"}} borderRadius={"50%"} p={1} onClick={handleClickUpVote}>
            <svg  rpl="" fill="currentColor" height="16" icon-name="upvote-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M10 19a3.966 3.966 0 01-3.96-3.962V10.98H2.838a1.731 1.731 0 01-1.605-1.073 1.734 1.734 0 01.377-1.895L9.364.254a.925.925 0 011.272 0l7.754 7.759c.498.499.646 1.242.376 1.894-.27.652-.9 1.073-1.605 1.073h-3.202v4.058A3.965 3.965 0 019.999 19H10zM2.989 9.179H7.84v5.731c0 1.13.81 2.163 1.934 2.278a2.163 2.163 0 002.386-2.15V9.179h4.851L10 2.163 2.989 9.179z"></path></svg>
          </Flex>
          <p style={{fontSize: 11, fontWeight: "bold", margin:0}}>{votes?.netScore}</p>
          <Flex ml={"auto"} width={"29px"} height={"29px"} justifyContent={"center"} alignItems={"center"} cursor={"pointer"} _hover={{bgColor:"#3f4d52ff",color:"purple.500"}} borderRadius={"50%"} p={1} onClick={handleClickDownVote}>
            <svg rpl="" fill="currentColor" height="16" icon-name="downvote-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M10 1a3.966 3.966 0 013.96 3.962V9.02h3.202c.706 0 1.335.42 1.605 1.073.27.652.122 1.396-.377 1.895l-7.754 7.759a.925.925 0 01-1.272 0l-7.754-7.76a1.734 1.734 0 01-.376-1.894c.27-.652.9-1.073 1.605-1.073h3.202V4.962A3.965 3.965 0 0110 1zm7.01 9.82h-4.85V5.09c0-1.13-.81-2.163-1.934-2.278a2.163 2.163 0 00-2.386 2.15v5.859H2.989l7.01 7.016 7.012-7.016z"></path></svg>
          </Flex> 
      </Flex>
      
      {/*  Comments  */}
      <Flex width={"53px"} height={"29px"} justifyContent={"center"} alignItems={"center"} gap={2} borderRadius={20} cursor={"pointer"} bgColor={"#323D41"} color={"white"} _hover={{bgColor:"#3f4d52ff"}} onClick={handleClickPost}>
           <svg rpl="" aria-hidden="true"  fill="currentColor" height="16" icon-name="comment" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M10 1a9 9 0 00-9 9c0 1.947.79 3.58 1.935 4.957L.231 17.661A.784.784 0 00.785 19H10a9 9 0 009-9 9 9 0 00-9-9zm0 16.2H6.162c-.994.004-1.907.053-3.045.144l-.076-.188a36.981 36.981 0 002.328-2.087l-1.05-1.263C3.297 12.576 2.8 11.331 2.8 10c0-3.97 3.23-7.2 7.2-7.2s7.2 3.23 7.2 7.2-3.23 7.2-7.2 7.2z"></path></svg>
          <p style={{ fontSize: 11, fontWeight: "bold", margin: 0 }}>{comments.length}</p>
       </Flex>

       {/* Reward the post */}
        <Flex width={"40px"} height={"29px"} justifyContent={"center"} alignItems={"center"} gap={2} borderRadius={20} cursor={"pointer"} bgColor={"#323D41"} color={"white"} _hover={{bgColor:"#3f4d52ff"}}>
       <svg rpl="" aria-hidden="true" fill="currentColor" height="16" icon-name="award" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M18.75 14.536l-2.414-3.581A6.947 6.947 0 0017 8c0-3.86-3.14-7-6.999-7-3.859 0-6.999 3.14-6.999 7 0 1.057.242 2.056.664 2.955l-2.414 3.581c-.289.428-.33.962-.109 1.429.22.467.658.776 1.173.826l1.575.151.758 1.494a1.435 1.435 0 001.297.795c.482 0 .926-.234 1.198-.639l2.437-3.612c.14.008.28.021.423.021.143 0 .282-.013.423-.021l2.437 3.612c.272.405.716.639 1.198.639.031 0 .062 0 .094-.003a1.435 1.435 0 001.203-.791l.758-1.495 1.576-.151c.514-.05.952-.358 1.172-.826a1.434 1.434 0 00-.109-1.429h-.006zM10 2.8A5.205 5.205 0 0115.2 8c0 2.867-2.333 5.2-5.2 5.2A5.205 5.205 0 014.801 8c0-2.867 2.332-5.2 5.2-5.2zM5.982 17.09l-.937-1.846-1.974-.189 1.66-2.462a7.02 7.02 0 002.936 1.999L5.982 17.09zm10.947-2.035l-1.974.189-.937 1.846-1.685-2.499a7.013 7.013 0 002.936-1.999l1.66 2.462v.001z"></path></svg>
       </Flex>
     
      {/* Share  */}
      <Flex width={"83px"} height={"29px"} justifyContent={"center"} alignItems={"center"} gap={2} borderRadius={20} cursor={"pointer"} bgColor={"#323D41"} color={"white"} _hover={{bgColor:"#3f4d52ff"}}> 
      <ShareButton/>
      </Flex>

      </div>
      <PostSummary isOpen={isOpen} onClose={onClose} postId={post.id}/>
    </div>
  )
}

export default Post;