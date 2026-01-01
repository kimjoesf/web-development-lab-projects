import { Flex, Text, Image, Avatar } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { IoChevronForward,IoChevronBack } from "react-icons/io5";
 
const DragAndDrop = ({setMedia, uploading, setUploading,from, media}) => {
  const inputRef = useRef(null);
  const [previews, setPreviews] = useState([]);
  const [index, setIndex] = useState(0);

const addFiles = (files) => {
  if (uploading) return;
  setUploading(true);


  const validFiles = Array.from(files).filter((file) =>
    from === "community"
      ? file.type.startsWith("image/")
      : file.type.startsWith("image/") || file.type.startsWith("video/")
  );

  if (!validFiles.length) {
    setUploading(false);
    return;
  }
 
  const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
  setPreviews((prev) => [...prev, ...newPreviews]);
  setMedia((prev) => [...prev, ...validFiles]);  
  setUploading(false);
};

const clear = ()=>{
  setPreviews([]);
  setMedia([]);
}


  const prev = (e) => {
    e.stopPropagation();
    setIndex((i) => (i === 0 ? previews.length - 1 : i - 1));
  };

  const next = (e) => {
    e.stopPropagation();
    setIndex((i) => (i === previews.length - 1 ? 0 : i + 1));
  };

  return (
    <>
      <input ref={inputRef}  type="file" accept={from==="community"? "image/*":"image/*,video/*"} multiple hidden onChange={(e) =>addFiles(e.target.files)}/>

      <Flex width={"100%"} height={previews.length && from!=="community"?"340px":"180px"} border={from==="community" && previews.length? "none" : "1px dashed #333" } borderRadius={"12px"} justify={"center"} align={"center"} cursor={"pointer"} position={"relative"} overflow={"hidden"}  gap={2} onClick={() => inputRef.current.click()} onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files);}}onDragOver={(e) => e.preventDefault()}>
        {previews.length ? from==="community"? (<Avatar size={"xl"} src={previews[0]}/>) : (
          <>
           {media[index].type.startsWith("image/") ?
           (<Image src={previews[index]} w={"100%"} h={"100%"} objectFit={"cover"}/>):(<video src={previews[index]} width={"100%"} height={"100%"} controls/>)}

            <Flex position={"absolute"} top={"8px"} left={"8px"} bg={"blackAlpha.700"} color={"white"} px={3} py={1} borderRadius={"20px"} fontSize={"12px"} cursor={"pointer"} onClick={(e) => {e.stopPropagation(); inputRef.current.click();}} zIndex={10}>
              Add
            </Flex>
            <Flex position={"absolute"} width={"40px"} height={"40px"} alignItems={"center"} top={"8px"} right={"8px"} bg={"blackAlpha.700"} color={"white"} px={3} py={1} borderRadius={"50%"} cursor={"pointer"}   onClick={(e) => {e.stopPropagation(); clear();}} zIndex={10}>
             <svg rpl="" fill="currentColor" height="16" icon-name="delete" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M15.2 15.7c0 .83-.67 1.5-1.5 1.5H6.3c-.83 0-1.5-.67-1.5-1.5V7.6H3v8.1C3 17.52 4.48 19 6.3 19h7.4c1.82 0 3.3-1.48 3.3-3.3V7.6h-1.8v8.1zM17.5 5.8c.5 0 .9-.4.9-.9S18 4 17.5 4h-3.63c-.15-1.68-1.55-3-3.27-3H9.4C7.68 1 6.28 2.32 6.13 4H2.5c-.5 0-.9.4-.9.9s.4.9.9.9h15zM7.93 4c.14-.68.75-1.2 1.47-1.2h1.2c.72 0 1.33.52 1.47 1.2H7.93z"></path></svg>
            </Flex>

          
            {previews.length > 1 && (
              <Flex
                position={"absolute"}
                alignItems={"center"}
                left={"10px"}
                top={"50%"}
                transform={"translateY(-50%)"}
                bg={"blackAlpha.600"}
                p={2}
                borderRadius={"full"}
                cursor={"pointer"}
                onClick={prev}
                color={"white"}
                >
               <IoChevronBack />
              </Flex>
            )}
 
            {previews.length > 1 && (
              <Flex
                position="absolute"
                alignItems={"center"}
                right="10px"
                top="50%"
                transform="translateY(-50%)"
                bg="blackAlpha.600"
                p={2}
                borderRadius="full"
                cursor="pointer"
                color={"white"}
                onClick={next}
              >
               <IoChevronForward />
              </Flex>
            )}
            <Flex position="absolute" bottom="8px" gap={2}>
              {previews.map((_, i) => (
                <Flex
                  key={i}
                  w="6px"
                  h="6px"
                  borderRadius="full"
                  bg={i === index ? "white" : "gray.500"}
                  transition="background-color 0.3s ease"
                />
              ))}
            </Flex>
          </>
        ) : (
        <>
        <Text color="#9db1b9ff">Drag and Drop or upload media</Text>
        <Flex
          bgColor="#323D41"
          color="white"
          p={2}
          borderRadius="50%"
        >
          <svg
            fill="currentColor"
            height="16"
            viewBox="0 0 20 20"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.3 16H6c-2.757 0-5-2.243-5-5a5.006 5.006 0 014.827-4.997c1.226-2.516 3.634-4.067 6.348-4.001a6.991 6.991 0 016.823 6.823 6.65 6.65 0 01-.125 1.434l-1.714-1.714c-.229-2.617-2.366-4.678-5.028-4.744-2.161-.059-4.058 1.307-4.892 3.463l-.247.638S6.448 7.798 6 7.798a3.204 3.204 0 00-3.2 3.2c0 1.764 1.436 3.2 3.2 3.2h4.3V16zm6.616-5.152l-3.28-3.28a.901.901 0 00-1.273 0l-3.28 3.28a.898.898 0 000 1.272.898.898 0 001.272 0l1.744-1.743v7.117a.9.9 0 001.8 0v-7.117l1.744 1.743a.898.898 0 001.272 0 .898.898 0 00.001-1.272z" />
          </svg>
        </Flex>
          </>
        )}
      </Flex>
    </>
  );
};

export default DragAndDrop;
