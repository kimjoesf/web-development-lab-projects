"use client"
import { Box, Flex,Text,Avatar, Button, Input} from "@chakra-ui/react";
import useCurrentCommunityStore from '@/store/communityStore';
import { useEffect, useRef, useState } from "react";
import Post from "@/components/home/Post";
import { useUser } from "@clerk/nextjs";
import useSettingPinned from "@/store/settingPinStore";
import useUserCommunitiesStore from "@/store/userComunitiesStore";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { FaPen } from "react-icons/fa";
import useSelectedCommunityStore from "@/store/selectedCommunityStore";

const page = () => {
  const{ userCommunities,addUserCommunity } = useUserCommunitiesStore();
  const {community,setCommunity} = useCurrentCommunityStore();
  const { isSettingPinned } = useSettingPinned();   
  const [isHovered, setIsHovered] = useState();
  const [ isUpdateNameClicked, setIsUpddateNameClicked] = useState();
  const [inputValue,setInputValue] = useState("");
  const [communityImage,setCommunityImage] = useState(null);
  const [communityImagePreview,setCommunityImagePreview] = useState(null);
  const [communityBanner,setCommunityBanner] = useState(null);
  const [communityBannerPreview,setCommunityBannerPreview] = useState(null);
  const [uploading,setUploading] = useState(false);
  const { setSelectedCommunity } = useSelectedCommunityStore();
  const communityImageRef = useRef();
  const communityBannerRef = useRef();
  const router  = useRouter();
  const {user} = useUser();
  const params = useParams();
  const communityName = params?.communityName;

  useEffect(() => {
    if (!communityName) return
    const getPost = async () => {
      try {
        const res = await axios.get("/api/getCommunityByName", {
          params: { communityName }
        });
        setCommunity(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getPost();
  }, [communityName, setCommunity]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(new Date(dateString));
  };

  const handleJoiningCommunity=async()=>{
    if(!community.id){
      console.log("community id is needed"); 
      return;
    }
    const res = await axios.post("/api/joinCommunity",{
      communityId:community?.id
    });
    addUserCommunity(res.data);
  } 

  const handleUpdateCommunity = async () => {
    try {
      let mediaBase64 = null;
      let fileName = null;
      let fileType = null;
      let bannerBase64 = null;
      let bannerFileName = null;
      let bannerFileType = null;
      if (communityImage) {
        fileName = communityImage.name;
        fileType = communityImage.type;

        mediaBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;

          reader.readAsDataURL(communityImage);
        });
      }
      if (communityBanner) {
         bannerFileName = communityBanner.name;
         bannerFileType = communityBanner.type;

          bannerBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(communityBanner);
        });
      }
      const res = await axios.patch("/api/updateCommunity", {communityId:community?.id, name:inputValue.length?inputValue:null, mediaBase64, fileName, fileType, bannerBase64, bannerFileName, bannerFileType })
      setCommunity(res.data);
    } catch (error) {
        console.log(error);
    }finally{handleRemove();}
  }

  const addFile = (file, from) => {
    if (uploading) return;
    setUploading(true);


    const filePreview = URL.createObjectURL(file);
    if (from === "image") {
      setCommunityImagePreview(filePreview);
      setCommunityImage(file);
    }
    else {
      setCommunityBannerPreview(filePreview);
      setCommunityBanner(file);
    }
    setUploading(false);
  };

  const handleRemove = ()=>{
    setInputValue("");
    setIsUpddateNameClicked(false);
    setCommunityImage(null);
    setCommunityImagePreview(null);
    setCommunityBanner(null);
    setCommunityBannerPreview(null);
  }
const handleCreateClicked=()=>{
  setSelectedCommunity(community);
  router.push("/createPost");
}

 if(!communityName) return null;

  return (
    <Flex width={"100vw"} minH={"100vh"} justifyContent={"center"} overflowX={"hidden"} scrollBehavior={"smooth"}>
      <Box width={"75%"} minH={"100vh"} marginRight={isSettingPinned?"210px":0} transition={"margin-right 0.2s ease-in-out"}>
        {/* Banner */}
        <Box position={"relative"} width={"100%"} height={"150px"} bgImage={communityBannerPreview?communityBannerPreview:`url(${community?.bannerUrl ||"/assets/defaultBanner.png"})`} bgPosition={"center"} bgRepeat={"no-repeat"} bgSize={"cover"} borderRadius={7}>
           <input ref={communityBannerRef} type="file" accept={"image/*"} multiple hidden onChange={(e)=>addFile(e.target.files[0],"banner")}/>
          <Flex position={"absolute"} cursor={"pointer"} bottom={2} right={2} bgColor={"blackAlpha.600"} borderRadius={"50%"} p={2} justifyContent={"center"} alignItems={"center"} display={community?.moderatorId===user?.id?"block":"none"} onClick={() => {communityBannerRef.current.click();}}>
            <FaPen color="white" />
          </Flex>
        </Box>
        <Flex width={"100%"} gap={3}  alignItems={"center"}>
        <Flex position={"relative"} onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
         <Avatar size={"xl"} src={communityImagePreview?communityImagePreview:community?.imageUrl} mb={10}/>
          <input ref={communityImageRef} type="file" accept={"image/*"} multiple hidden onChange={(e)=>addFile(e.target.files[0],"image")}/>
          <Flex position={"absolute"} cursor={"pointer"} top={"50%"} left={"50%"} transform={"translate(-50%, -50%)"} bgColor={"blackAlpha.600"} borderRadius={"50%"} p={2} justifyContent={"center"} alignItems={"center"} display={isHovered && community?.moderatorId===user?.id?"flex":"none"} onClick={() => {communityImageRef.current.click();}}>
            <FaPen color="white" />
          </Flex>
        </Flex>

         {isUpdateNameClicked?(<Flex>
          <Text fontSize={"2xl"} fontWeight={"bold"} color={"white"}>r/</Text>
          <Input value={inputValue} onChange={(e)=>setInputValue(e.target.value)} width={'170px'} borderRadius={20} color={"white"} fontWeight={"bold"} />
         </Flex>):<Text fontSize={"2xl"} fontWeight={"bold"} color={"white"}>r/{community?.name}</Text>}
          <Flex cursor={"pointer"} bgColor={"blackAlpha.600"} borderRadius={"50%"} p={2} mt={1} alignItems={"center"} justifyContent={"center"} display={community?.moderatorId===user?.id &&!isUpdateNameClicked?"block":"none"} onClick={()=>setIsUpddateNameClicked(true)}>
            <FaPen color="white" />
          </Flex>
          <Flex gap={2} display={isUpdateNameClicked || communityImage || communityBanner ?"flex":"none"}>
            <Button size={"sm"}  bgColor={"whiteAlpha.400"} color={"white"} _hover={{bgColor:"whiteAlpha.500"}} borderRadius={20} onClick={handleRemove}>
              Cancel
            </Button>
            <Button size={"sm"} bgColor={"#135accff"} color={"white"} _hover={{bgColor:"blue.500"}} borderRadius={20} onClick={handleUpdateCommunity}>
              Save
            </Button>
          </Flex>

         <Flex width={"18%"}  ml={"auto"} justifyContent={"space-between"} onClick={handleCreateClicked}>   
            <Flex width={"120px"} height={"40px"} justifyContent={"center"} alignItems={"center"} borderRadius={20} gap={2} cursor={"pointer"} border={"1px solid #ccc"} _hover={{borderColor: "white",color:"white" }} color={"#ccc"}>
              <svg rpl="" fill="currentColor" height="20" icon-name="add" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.1 9.1h-6.2V2.9c0-.5-.4-.9-.9-.9s-.9.4-.9.9v6.2H2.9c-.5 0-.9.4-.9.9s.4.9.9.9h6.2v6.2c0 .5.4.9.9.9s.9-.4.9-.9v-6.2h6.2c.5 0 .9-.4.9-.9s-.4-.9-.9-.9z"></path>
                </svg>
              <Text fontWeight={"semibold"} fontSize={14}>Create Post</Text>
            </Flex>     
             <Button width={"57px"} height={"41px"} fontSize={14} bgColor={"#135accff"} color={"white"} _hover={{bgColor:"blue.400"}} borderRadius={19} padding={2} display={userCommunities.some(com=>com?.id===community?.id)?"none":"block"} onClick={handleJoiningCommunity}>Join</Button>
         </Flex>

        </Flex>
        <Flex width={"100%"} gap={2}>
          <div style={{width:"71%", alignSelf:"flex-start"}}> 
            {community?.posts?.map((post)=>(<Post key={post.id} post={post}/>))}
          </div>
          <Flex flex={1} height={"fit-content"} bgColor={"black"} borderRadius={17} mt={-9} direction={"column"} p={5} gap={1}>  
             <Text fontSize={14} color={"#ccc"} fontWeight={"bold"}>{community?.name}</Text>
             <Text fontSize={14} color={"#ccc"}>{community?.description}</Text>
             
             <Flex gap={2} mt={3} color={"#ccc"} alignItems={"center"}>
                <svg rpl="" fill="currentColor" height="16" icon-name="cake" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.771 6.795l-5.776-4.072c-1.099-.774-2.521-.939-3.716-.429-.945.405-1.875.998-2.688 1.714-1.646 1.45-2.59 3.584-2.59 5.855v5.834c0 1.82 1.48 3.301 3.3 3.301h9.4c1.819 0 3.3-1.48 3.3-3.3V9.165c0-.94-.46-1.828-1.229-2.372l-.001.001zM5.779 5.36a8.38 8.38 0 012.208-1.41c.234-.1.487-.15.743-.15.425 0 .857.135 1.227.396l5.844 4.12a.464.464 0 01.183.542.465.465 0 01-.463.34h-9.52c-.822 0-1.578.267-2.2.712v-.045c0-1.754.721-3.396 1.979-4.504h-.001zM14.7 17.2H5.3a1.501 1.501 0 01-1.499-1.5v-2.704c0-1.213.987-2.2 2.2-2.2h9.52c.239 0 .466-.04.679-.11v1.876a.638.638 0 01-.638.638H7v1.6h8.562c.223 0 .434-.043.638-.104v1.003c0 .828-.672 1.501-1.499 1.501H14.7z"></path>
                </svg>
                <Text fontSize={13}>{formatDate(community.createdAt)}</Text>
             </Flex>
            
            <Flex gap={2} mb={3} color={"#ccc"} alignItems={"center"}>
              <svg rpl="" fill="currentColor" height="16" icon-name="browser" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 1c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9zm7.15 8.2h-3.17c-.1-2.37-.62-4.46-1.4-5.91 2.46.95 4.27 3.2 4.57 5.91zm-7.15 8c-.66 0-2.2-2.24-2.38-6.4h4.76c-.18 4.16-1.73 6.4-2.38 6.4zm-2.38-8C7.8 5.04 9.35 2.8 10 2.8c.65 0 2.2 2.24 2.38 6.4H7.62zm-.2-5.91c-.78 1.45-1.3 3.55-1.4 5.91H2.85c.3-2.71 2.11-4.97 4.57-5.91zM2.85 10.8h3.17c.1 2.37.62 4.46 1.4 5.91-2.46-.95-4.27-3.2-4.57-5.91zm9.73 5.91c.78-1.45 1.3-3.55 1.4-5.91h3.17a7.188 7.188 0 01-4.57 5.91z"></path>
              </svg>
              <Text fontSize={13}>{community.type}</Text>
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
  );

}

export default page;