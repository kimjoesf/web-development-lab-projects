"use client"
import CommunitySelector from "@/components/createPost/CommunitySelector";
import DragAndDrop from "@/components/createPost/DragAndDrop";
import InputField from "@/components/createPost/InputField";
import TextEditor from "@/components/createPost/TextEditor";
import useCurrentPostStore from "@/store/postStore";
import useSelectedCommunityStore from "@/store/selectedCommunityStore";
import { Flex, Text } from "@chakra-ui/react";
import {useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

 
const page = () => {
  const items = ["Text", "Images & Video", "Link", "Poll"];
  const [active, setActive] = useState("Text");
  const [value, setValue] = useState("");   // for title 
  const [linkValue, setLinkValue] = useState("");   // incase the body is just a link 
  const [textAreaValue, setTextAreaValue] = useState(""); 
  const {selectedCommunity,setSelectedCommunity} = useSelectedCommunityStore();
  const [media, setMedia] = useState([]);    
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const {setPost} = useCurrentPostStore();
  const router = useRouter();
  const {user} =  useUser();


const prepareMediaPayload = async (media) => {
  const results = await Promise.all(
    media.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () =>
            resolve({
              mediaBase64: reader.result,
              fileName: file.name,
              fileType: file.type,
              mediaType: file.type.startsWith("video/")
                ? "video"
                : "image",
            });

          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    )
  );

  return results;
};



async function handleCreatePost() {
  if (!value) return alert("Title required");

  if (!textAreaValue && media.length === 0)
    return alert("Post must have text or media");

  if (!selectedCommunity.id)
    return alert("Post must have community");

  if(loading) return;

  try {
   setLoading(true);
    const mediaPayload = await prepareMediaPayload(media);
    const res = await axios.post("/api/createPost",{
      title: value,
      body: textAreaValue || linkValue,
      communityId:selectedCommunity?.id,
      media:mediaPayload
    })
    const post = res.data;
    setPost(post);
    router.push(`/r/${post?.community?.name}/${post?.id}`);
 
} catch (error) {
  console.log(error);
}finally{setLoading(false);}
}


  return (
    <div style={{width:"70vw",height:"100vh", marginLeft:170,padding:17,display:"flex",flexDirection:"column",gap:5}}>
        <h1 style={{color:"#9db1b9ff", fontWeight:"bold", fontSize:25}}>Create post</h1>
        <CommunitySelector selectedCommunity={selectedCommunity} setSelectedCommunity={setSelectedCommunity}/>
        <div style={{display:"flex", gap:15}}>
        {items.map((item) => (
          <Flex key={item} direction={"column"} align={"flex-start"} cursor={"pointer"} p={3} color={item==="Poll"?"grey":active === item ? "white" : "#ccc"} _hover={{ bgColor:"#323D41" }} onClick={() => setActive(item)} pointerEvents={item==="Poll"?"none":"unset"}>
            <Text fontSize={15} fontWeight={"semibold"}>{item}</Text>
            {active === item && ( <Flex  mt={"3px"} height={"2px"} w={"100%"} bg={"blue.400"} borderRadius={"full"} />
            )}
          </Flex>
        ))}
        </div>
    <Flex width={"70%"} direction={"column"} gap={3}>
      <InputField value={value} setValue={setValue}/>
        <Flex width={"70px"} height={"30px"} mr={-3} justifyContent={"center"} alignItems={"center"} borderRadius={20} gap={2} cursor={"context-menu"} bgColor={"#20272bff"} color={"grey"} marginTop={16}>
          <Text fontWeight={"bold"} fontSize={12}  color={"grey"}>Add tags</Text>
        </Flex>
      {active==="Text"?<TextEditor textAreaValue={textAreaValue} setTextAreaValue={setTextAreaValue}/>:active==="Images & Video"? <DragAndDrop media={media} setMedia={setMedia} uploading={uploading} setUploading={setUploading}/> :<InputField from={"Link"} linkValue={linkValue} setLinkValue={setLinkValue}/>}
      <Flex gap={5} ml={"auto"}>
        <Flex width={"120px"} height={"40px"} mr={-3} justifyContent={"center"} alignItems={"center"} borderRadius={20} gap={2} cursor={"pointer"} pointerEvents={active==="Link"? (value&&linkValue?"unset":"none"):(value?"unset":"none")} bgColor={value?"#135accff":"#20272bff"}>
          <Text fontWeight={"bold"} fontSize={14} color={value?"white":"grey"}>Save Draft</Text>
        </Flex>
        <Flex width={"60px"} height={"40px"} mr={-3} justifyContent={"center"} alignItems={"center"} borderRadius={20} gap={2} cursor={"pointer"} pointerEvents={active==="Link"? (value&&linkValue?"unset":"none"):(value?"unset":"none")} bgColor={value?"#135accff":"#20272bff"} onClick={handleCreatePost}>
          <Text fontWeight={"bold"} fontSize={14} color={value?"white":"grey"}> Post</Text>
        </Flex>
      </Flex>
    </Flex>
    </div>
  )
}

export default page;