import { Box, FormControl,FormErrorMessage, Input, Text, Collapse,Flex} from "@chakra-ui/react";
import { useState } from "react";

const InputField = ({value,setValue,from,linkValue,setLinkValue})=> {
  const [touched, setTouched] = useState(false);

  const isError = touched && (from==="Link"?linkValue:value).trim() === "";
  console.log(from);
  return (
    <FormControl isInvalid={isError}>
      <Box position="relative" width={"100%"}>
        {/* Input */}
        <Input value={from==="Link"?linkValue:value} onChange={(e) => from==="Link"? setLinkValue(e.target.value):setValue(e.target.value)} onBlur={() =>setTouched(true)} maxLength={300} border={"1px solid #333"} borderRadius={20} color={"white"}  pt={"22px"} height={"56px"} _focus={{borderColor: "blue.400"}}/>

        <Text position={"absolute"} left={"14px"} top={value || linkValue ? "6px" : "50%"}  transform={value || linkValue ? "none" : "translateY(-50%)"}  fontSize={value || linkValue ? "11px" : "14px"}  color={isError ? "red.400" : "gray.400"}  pointerEvents={"none"}  transition={"all 0.15s ease"}>  
          {from==="Link"?"Link URL":"Title"} <span style={{ color: "#ff6b6b" }}>*</span>
        </Text>
 
        <Text position={"absolute"} right={"12px"} bottom={"-22px"} fontSize={"12px"} color={"gray.400"} display={from==="Link"?"none":"block"}>
          {value?.length}/300
        </Text>
      </Box>

      <Collapse in={isError} animateOpacity>
        <FormErrorMessage mt={1}>
          Please fill out this field.
        </FormErrorMessage>
      </Collapse>
    </FormControl>
  );
}

export default InputField;