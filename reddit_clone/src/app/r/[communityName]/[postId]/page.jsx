"use client"
import { Box, Flex,Text,Avatar, Button} from "@chakra-ui/react";
import Post from "@/components/home/Post";
import { useUser } from "@clerk/nextjs";
import useSettingPinned from "@/store/settingPinStore";
import useCurrentPostStore from "@/store/postStore";
import CommentInput from "@/components/commentsPage/CommentInput";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import CommentThread from "@/components/postPage/CommentThread";
import useUserCommunitiesStore from "@/store/userComunitiesStore";
const page = () => {
  
  const {post,setPost} = useCurrentPostStore();
  const { isSettingPinned } = useSettingPinned(); 
  const{ userCommunities, addUserCommunity} = useUserCommunitiesStore();  
  const {user} = useUser();
  const [media,setMedia] = useState([]);
  const[ comments , setComments ]= useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const params = useParams();
  const postId = params?.postId;

  useEffect(()=>{
    if(!postId) return
    const getPost= async ()=>{
      try {
      const res = await axios.get("/api/getPostById",{
        params: { postId }
      });
       setPost(res.data);
    } catch (error) {
      console.log(error)
    }
  }
    getPost();
  },[postId, setPost]);

  const formatDate = (dateString) => {
  if(!dateString) return"";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(dateString));
};


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

if(!postId) return null;

  return (
    <Flex width={"100vw"} minH={"100vh"} justifyContent={"center"} overflowX={"hidden"}>
      <Box width={"75%"} minH={"100vh"} marginRight={isSettingPinned?"210px":0} transition={"margin-right 0.2s ease-in-out"} padding={3} mt={3}>
        <Flex width={"100%"} gap={10}>
          <div style={{width:"71%", alignSelf:"flex-start"}}> 
             <Post post={post} comments={comments} setComments={setComments}/> 
              <CommentInput media={media} setMedia={setMedia} postId={postId} setComments={setComments} isFocused={isFocused} setIsFocused={setIsFocused}/>
               {comments.map((comment)=>(<CommentThread key={comment.id} comment={comment}/>))}
          </div>

          {/* community info */}
          <Flex flex={1} height={"fit-content"} bgColor={"black"} borderRadius={17} direction={"column"} p={5} gap={1}>  
            <Flex alignItems={"center"} width={"100%"}>
           
            <Text fontSize={16} color={"#ccc"} fontWeight={"bold"} mr={5}>r/{post?.community?.name}</Text>
            <Avatar size={"md"} src={post?.community?.imageUrl}/>
           
            <Button width={"60px"} height={"35px"} fontSize={14} bgColor={"#135accff"} color={"white"} _hover={{bgColor:"blue.400"}} borderRadius={19} padding={2} ml={"auto"} display={userCommunities.some(com=>com?.id===post?.community?.id)?"none":"block"} onClick={handleJoiningCommunity}>Join</Button>
            </Flex>
            
             <Text fontSize={14} color={"#ccc"} fontWeight={"bold"}>{post?.community?.name}</Text>
             <Text fontSize={14} color={"#ccc"}>{post?.community?.description}</Text>
             
             <Flex gap={2} mt={3} color={"#ccc"} alignItems={"center"}>
                <svg rpl="" fill="currentColor" height="16" icon-name="cake" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.771 6.795l-5.776-4.072c-1.099-.774-2.521-.939-3.716-.429-.945.405-1.875.998-2.688 1.714-1.646 1.45-2.59 3.584-2.59 5.855v5.834c0 1.82 1.48 3.301 3.3 3.301h9.4c1.819 0 3.3-1.48 3.3-3.3V9.165c0-.94-.46-1.828-1.229-2.372l-.001.001zM5.779 5.36a8.38 8.38 0 012.208-1.41c.234-.1.487-.15.743-.15.425 0 .857.135 1.227.396l5.844 4.12a.464.464 0 01.183.542.465.465 0 01-.463.34h-9.52c-.822 0-1.578.267-2.2.712v-.045c0-1.754.721-3.396 1.979-4.504h-.001zM14.7 17.2H5.3a1.501 1.501 0 01-1.499-1.5v-2.704c0-1.213.987-2.2 2.2-2.2h9.52c.239 0 .466-.04.679-.11v1.876a.638.638 0 01-.638.638H7v1.6h8.562c.223 0 .434-.043.638-.104v1.003c0 .828-.672 1.501-1.499 1.501H14.7z"></path>
                </svg>
                <Text fontSize={13}>{formatDate(post?.community?.createdAt)}</Text>
             </Flex>
            
            <Flex gap={2} mb={3} color={"#ccc"} alignItems={"center"}>
              <svg rpl=""  fill="currentColor" height="16" icon-name="browser" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 1c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9zm7.15 8.2h-3.17c-.1-2.37-.62-4.46-1.4-5.91 2.46.95 4.27 3.2 4.57 5.91zm-7.15 8c-.66 0-2.2-2.24-2.38-6.4h4.76c-.18 4.16-1.73 6.4-2.38 6.4zm-2.38-8C7.8 5.04 9.35 2.8 10 2.8c.65 0 2.2 2.24 2.38 6.4H7.62zm-.2-5.91c-.78 1.45-1.3 3.55-1.4 5.91H2.85c.3-2.71 2.11-4.97 4.57-5.91zM2.85 10.8h3.17c.1 2.37.62 4.46 1.4 5.91-2.46-.95-4.27-3.2-4.57-5.91zm9.73 5.91c.78-1.45 1.3-3.55 1.4-5.91h3.17a7.188 7.188 0 01-4.57 5.91z"></path>
              </svg>
              <Text fontSize={13}>{post?.community?.type}</Text>
            </Flex>
            <Flex width={"100%"} borderTop={"0.11px solid #333"} />
            <Text fontSize={14} fontWeight={"semibold"} color={"#ccc"} mt={3} mb={3}>User flair</Text>
            <Flex gap={2}>
              < Avatar size={"xs"} src={user?.imageUrl}/>
              <Text fontSize={13} color={"#ccc"}>{user?.username}</Text>
            </Flex>
             <Flex width={"100%"} borderTop={"0.11px solid #333"} mt={5}/>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}

export default page;









  // tany 7aga lw post store b null a3ml ro7 call api tgeeb el post nfso wa 5las wa kda kda comments wa el ba2i hyrun gowa el post 
  // tyb yb2a 5ly el post dymn byrg3 m3ah el author el community wa el wa seeeb el votes wa el comments lw7dhom

// 3shan t upload image el comment 
/*   try {
      let mediaBase64 = null;
      let fileName = null;
      let fileType = null;

      if (media.length > 0) {
        const file = media[0];
        fileName = file.name;
        fileType = file.type;

        mediaBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(file);
        });
      }

     const res = await axios.post("/api/createCommunity", {
        mediaBase64,
        fileName,
        fileType,
        type: communityType,
        about:selectedOption,
        name: communityName,
        description,
        mature: isMature,
      });
      const community = res.data;
       reset();
       router.push(`/r/${community.name}`);


    } catch (error) {
      alert("Failed to create community: " + error);
    }finally{setIsLoading(false)}*/