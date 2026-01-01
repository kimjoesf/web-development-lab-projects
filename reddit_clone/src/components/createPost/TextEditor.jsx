import { Box, Flex, IconButton, Textarea, Divider } from "@chakra-ui/react";
import {FiBold, FiItalic,FiLink, FiList,FiCode} from "react-icons/fi";
import { useRef } from "react";

const TextEditor=({textAreaValue,setTextAreaValue})=> {
  const textareaRef = useRef(null);

  const applyWrap = (before, after = before) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;

    textarea.value =
      value.slice(0, start) +
      before +
      value.slice(start, end) +
      after +
      value.slice(end);

    textarea.focus();};

  return (
    <Box border={"1px solid #333"} borderRadius={"12px"} p={3} color={"white"} maxWidth={"100%"}>
     
      <Flex gap={1} wrap="wrap" color={"white"}>
        <IconButton
          aria-label="Bold"
          icon={<FiBold />}
          size="sm"
          variant="ghost"
          color={"#9db1b9ff"}
          onClick={() => applyWrap("**")}
        />
        <IconButton
          aria-label="Italic"
          icon={<FiItalic />}
          size="sm"
          variant="ghost"
          onClick={() => applyWrap("*")}
        />
        <IconButton
          aria-label="List"
          icon={<FiList />}
          size="sm"
          variant="ghost"
          onClick={() => applyWrap("- ", "")}
        />
        <IconButton
          aria-label="Code"
          icon={<FiCode />}
          size="sm"
          variant="ghost"
          onClick={() => applyWrap("`")}
        />
        <IconButton
          aria-label="Link"
          icon={<FiLink />}
          size="sm"
          variant="ghost"
          onClick={() => applyWrap("[text](url)", "")}
        />
      </Flex>

      <Divider my={3} borderColor="#2a2f3a" />

      <Textarea
        ref={textareaRef}
        placeholder={"Body text (optional)"}
        _placeholder={{color:"#9db1b9ff"}}
        resize="vertical"
        minHeight="140px"
        bg="transparent"
        border="none"
        _focus={{ boxShadow: "none" }}
        fontSize="sm"
        value={textAreaValue}
        onChange={(e)=>setTextAreaValue(e.target.value)}/>
    </Box>
  );
}

export default TextEditor;
