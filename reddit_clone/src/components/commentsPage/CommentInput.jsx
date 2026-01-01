import { useState, useRef } from 'react';
import { Flex, Textarea, Button, Box, IconButton, Tooltip, Image } from '@chakra-ui/react';
import { MdImage } from 'react-icons/md';
import axios from 'axios';

const CommentInput = ({postId,parentCommentId,setComments,setReplies,from, isFocused, setIsFocused}) => {
  const [commentContent, setCommentContent] = useState('');
  const [uploading , setUploading] = useState(false);
  const [isLoading , setIsLoading] = useState(false);
  const [media , setMedia] = useState([]);
  const [previews, setPreviews] = useState([]);
  const textareaRef = useRef(null);
   const inputRef = useRef(null);

 
  const handleCancel = () => { 
      setIsFocused(false);
      setCommentContent('');
      setPreviews([]);
      setMedia([]);
  };

  const handleCreateComment = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      let mediaBase64 = null;
      let fileName = null;
      let fileType = null;

      const file = media?.[0];

      if (file) {
        fileName = file.name;
        fileType = file.type;

        mediaBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;

          reader.readAsDataURL(file);
        });
      }
      console.log(postId);
      const res = await axios.post("/api/createComment", {
        mediaBase64,
        fileName,
        fileType,
        content: commentContent,
        postId,
        parentCommentId:parentCommentId || null,
      });
      if(from==="comment") setReplies(prev=>[res.data,...prev]);
      else setComments(prev=>[res.data,...prev]);
    } catch (error) {
      console.error(error);
      alert("Failed to create comment");
    } finally {
      setIsLoading(false);
      handleCancel();
    }

  } 

  const addFiles = (files) => {
  if (uploading) return;
  setUploading(true);

  const validFiles = Array.from(files).filter((file) =>
  file.type.startsWith("image/"));

  if (!validFiles.length) {
    setUploading(false);
    return;
  }
 
  const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
  setPreviews((prev) => [...prev, ...newPreviews]);
  setMedia((prev) => [...prev, ...validFiles]);  
  setUploading(false);
};

  return (
    <Box width={"100%"} border={"1px solid #999"} borderRadius={20} overflow={"hidden"} boxShadow={isFocused ? '0 0 0 1px #333' : 'none'} transition={"all 0.2s"} mt={from==="comment"?0:20} mb={50} display={from==="comment" && !isFocused?"none":"box"}>
      <Flex width={"98%"} height={"320px"} border={"3px solid pink"} justifySelf={"center"} display={previews.length?"flex":"none"}><Image src={previews[0]} w={"100%"} h={"100%"} objectFit={"cover"}/></Flex>
      <Flex p={3} alignItems={"center"} gap={3}>
        <Textarea  ref={textareaRef} value={commentContent} color={"white"} onChange={(e) =>setCommentContent(e.target.value)} onFocus={()=>setIsFocused(true)} placeholder={"Add your reply"} border="none" resize="none" height="30px" maxH="200px" _focus={{ boxShadow: 'none' }} fontSize={"sm"} rows={1} />
      </Flex>

      {isFocused && (
        <Flex p={3} justify={"space-between"} alignItems={"center"} gap={2}>
          <Tooltip hasArrow label={"Image"} placement={"top"} bgColor={"black"} >
            <IconButton icon={<MdImage color={"#ccc"}/>} size="sm" variant={"ghost"} _hover={{bgColor:"whiteAlpha.400"}} borderRadius={"50%"} onClick={() => {inputRef.current.click();}}/>
               <input ref={inputRef}  type="file" accept={"image/*"} multiple hidden onChange={(e) => addFiles(e.target.files)}/>
          </Tooltip>
          <Flex gap={2}>
            <Button size={"sm"}  bgColor={"whiteAlpha.400"} color={"white"} _hover={{bgColor:"whiteAlpha.500"}} borderRadius={20} onClick={handleCancel}>
              Cancel
            </Button>
            <Button size={"sm"} bgColor={"#135accff"} color={"white"} _hover={{bgColor:"blue.500"}} borderRadius={20} onClick={handleCreateComment} isLoading={isLoading}>
              Comment
            </Button>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default CommentInput;