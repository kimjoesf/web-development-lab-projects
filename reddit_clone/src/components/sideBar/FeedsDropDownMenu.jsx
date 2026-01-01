import { Box, Flex, Text } from "@chakra-ui/react"
import { resourcesContainerDataPart1, resourcesContainerDataPart2, resourcesContainerDataPart3 } from "../../../public/static-data/sideBarData"

 
const FeedsDropDownMenu = ({isFeedClicked}) => {
  return (
      <Flex width={"100%"} maxHeight={isFeedClicked ? "3000px" : "0"} gap={3} direction={"column"} alignItems={"center"} overflow={isFeedClicked ? "unset" : "hidden"} opacity={isFeedClicked ? 1 : 0} transition={isFeedClicked ? "opacity 0.9s ease" : "opacity 0.14s ease-out"}>
          {
              resourcesContainerDataPart1.map((obj, i) => (
                  <Flex width={"100%"} key={obj.iconName + i} justifyContent={"flex-start"} alignItems={"center"} gap={3} padding={2} paddingLeft={5} borderRadius={7} cursor={"pointer"} _hover={{ bgColor: "whiteAlpha.200",color:"white" }} zIndex={5} color={"#ccc"}>
                      <svg fill="currentColor" height="20" icon-name={obj.iconName} viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                          <path d={obj.path}></path>
                      </svg>
                      <Text fontSize={14}>{obj.label}</Text>
                      {i == 3 && <Text color= {"#d1450eff"}  fontSize={12} ml={-1} fontWeight={"semibold"}>BETA</Text>}
                  </Flex>
              ))
          }
          <Flex width={"100%"} borderTop={"0.11px solid #333"} />
          {
              resourcesContainerDataPart2.map((obj, i) => (
                  <Flex width={"100%"} key={obj.iconName + i} justifyContent={"flex-start"} alignItems={"center"} gap={3} padding={2} paddingLeft={5} borderRadius={7} cursor={"pointer"} _hover={{ bgColor: "whiteAlpha.200",color:"white" }} zIndex={5} color={"#ccc"}>
                      <svg fill="currentColor" height="20" icon-name={obj.iconName} viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                          <path d={obj.path}></path>
                      </svg>
                      <Text fontSize={14}>{obj.label}</Text>
                  </Flex>
              ))
          }
          <Flex width={"100%"} borderTop={"0.11px solid #333"} />
          {
              resourcesContainerDataPart3.map((obj, i) => (
                  <Flex width={"100%"} key={obj.iconName + i} justifyContent={"flex-start"} alignItems={"center"} gap={3} padding={2} paddingLeft={5} borderRadius={7} cursor={"pointer"} _hover={{ bgColor: "whiteAlpha.200",color:"white" }} zIndex={5} color={"#ccc"}>
                      <svg fill="currentColor" height="20" icon-name={obj.iconName} viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                          <path d={obj.path}></path>
                      </svg>
                      <Text fontSize={14}>{obj.label}</Text>
                  </Flex>
              ))
          }
      </Flex>
  )
}

export default FeedsDropDownMenu;