"use client"
import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BsArrowUpRightCircle } from "react-icons/bs";
import { PiCirclesThreeBold } from "react-icons/pi";
import { IoIosArrowUp } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import ResourceDropDownMenu from '../sideBar/ResourceDropDownMenu';
import GamesDropDownMenu from '../sideBar/GamesDropDownMenu';
import FeedsDropDownMenu from '../sideBar/FeedsDropDownMenu';
import CommuntiesDropDownMenu from '../sideBar/CommuntiesDropDownMenu';
import { useRouter } from 'next/navigation';
import useSettingPinned from '@/store/settingPinStore';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import CreateCommunityModal from '../modals/CreateCommunityModal';
import useCurrentCommunityStore from '@/store/communityStore';
import useUserCommunitiesStore from '@/store/userComunitiesStore';

 
 

const SideBar = () => {
  const[isExpandedButtonHovered,setIsExpandedButtonHovered] = useState(false);
  const[isExpanded, setIsExpanded ] = useState(false);
  const[isExpandedButtonClicked, setIsExpandedButtonClicked] = useState(false);
  const[isResourceClicked, setIsResourceClicked] = useState(false);
  const[isGameClicked, setIsGameClicked] = useState(false);
  const[isCommunitiesClicked, setIsCommunitiesClicked] = useState(false);
  // const [userCommunities,setUserCommunities] = useState([]);
  const{userCommunities, setUserCommunities} = useUserCommunitiesStore()
  const[isFeedClicked, setIsFeedClicked] = useState(false);
  const[isHover, setIsHover] = useState(false);
  const router = useRouter();
  const { setIsSettingPinned } = useSettingPinned();
  const {isSignedIn,user} = useUser()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { setCommunity } = useCurrentCommunityStore();

  const handleClosingExpansion = (e) => {
    setIsExpanded(false);
    setIsHover(false);
    if(!isExpandedButtonClicked) setIsSettingPinned(false);
    if (!isExpandedButtonClicked) {
      (e.currentTarget.style.width = "40px");
    }
  }

  const handleClickingExpansionButton = (e) => {
    const parent = e.currentTarget.parentElement;
    const newState = !isExpandedButtonClicked;
    setIsExpandedButtonClicked(newState);
    setIsSettingPinned(newState);

      if (newState)
        (parent.style.width = "270px");
      else
        (parent.style.width = "40px");
  }

 

  useEffect(()=>{
    const getUserCommunities = async()=>{
        try {
          const res = await axios.get("/api/getUserCommunities");
          const created = res.data.createdCommunities ?? [];
          const joined = res.data.joinedCommunities ?? [];
          setUserCommunities([...created,...joined]);
        } catch (error) {
          alert("error"+error); 
        }
    }
    getUserCommunities();
  },[isSignedIn])


  return ( 
    <Flex width={"40px"} height={"100vh"} borderRight={"0.1px solid grey"} backgroundColor={"#0E1113"} color={"white"} position={"relative"} transition={"width 0.5s ease"} onMouseEnter={()=>setIsHover(true)} onMouseLeave={handleClosingExpansion}>
      
        <Flex justifyContent={"center"} alignItems = {"center"} width= {"33px"} height ={"33px"} border={"1px solid"} borderColor={isExpandedButtonHovered?"white":"grey"} borderRadius={"50%"} padding={1} position={"absolute"} top={"20px"} backgroundColor = {"black"} cursor= {"pointer"} right ={0} transform={"translateX(50%)"} onMouseEnter={()=>setIsExpandedButtonHovered(true)} onMouseLeave={()=>setIsExpandedButtonHovered(false)} onClick={handleClickingExpansionButton} zIndex={10}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 4 }}>
                <div style={{ width: "13px", border: "1px solid", borderRadius: 20, borderColor:isExpandedButtonHovered?"white":"#ccc" }}></div>
                <div style={{ width: "13px", border: "1px solid", borderRadius: 20, borderColor:isExpandedButtonHovered?"white":"#ccc" }}></div>
                <div style={{ width: "13px", border: "1px solid", borderRadius: 20, borderColor:isExpandedButtonHovered?"white":"#ccc" }}></div>
            </div>
        </Flex>
      
       {/* just for the expansion to be below the expansion button as in reddit */}
      <Flex position={"absolute"} top={"60px"} left={"0"} width={"100%"} height={"calc(100% - 60px)"} onMouseEnter={(e) => {setIsExpanded(true); (e.currentTarget.parentElement.style.width = "270px");}} zIndex={isExpanded?0:10}/> 
      
      <Flex width={"100%"}  gap={2} paddingLeft={3.5} overflowX={"hidden"} overflowY={isHover? "auto":"hidden"} scrollBehavior={"smooth"} className={"custom-scrollbar-sideBar"} paddingBottom={"70px"}  zIndex={5} opacity={isExpanded || isExpandedButtonClicked ? 1 : 0} transition={isExpanded || isExpandedButtonClicked ? "opacity 0.9s ease" : "opacity 0.14s ease-out"} pointerEvents={isExpanded || isExpandedButtonClicked ?"all":"none"} direction={"column"} border={"1px solid grey"}>
        
        <Flex width={"86%"}  justifyContent={"flex-start"} alignItems={"center"} gap={3} padding={3} paddingLeft={5} borderRadius={7} cursor={"pointer"} _hover={{bgColor:"whiteAlpha.200",color:"white"}} color={"#ccc"} marginTop={5} onClick={()=> router.push("/")}>
          <svg rpl="" fill="currentColor" height="20" icon-name="home-fill" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M17.875 8.525a1.584 1.584 0 00-.35-.52L11.13 1.653a1.602 1.602 0 00-2.264 0L2.47 8.005a1.604 1.604 0 00-.473 1.135v6.374a3.3 3.3 0 003.3 3.3h3.7V12h2v6.814h3.7a3.3 3.3 0 003.3-3.3V9.14c0-.211-.042-.42-.123-.615h.001z"></path></svg> 
            <Text fontSize={14}>Home</Text>
          </Flex>   
       
        <Flex width={"86%"}  justifyContent={"flex-start"} alignItems={"center"} gap={3} padding={3} paddingLeft={5} borderRadius={7} cursor={"pointer"} _hover={{ bgColor: "whiteAlpha.200",color:"white" }} zIndex={5} color={"#ccc"}>
          <BsArrowUpRightCircle size={20} />
          <Text fontSize={14}>Popular</Text>
        </Flex>

        <Flex width={"86%"}  justifyContent={"flex-start"} alignItems={"center"} gap={3} padding={3} paddingLeft={5} borderRadius={7} cursor={"pointer"} _hover={{ bgColor: "whiteAlpha.200",color:"white" }} zIndex={5} color={"#ccc"}>
          <svg rpl="" fill="currentColor" height="20" icon-name="answers" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M18.332 11.042l-4.05-7.056A4.875 4.875 0 009.92 1.5a4.898 4.898 0 00-4.198 2.485l-4.05 7.056a4.938 4.938 0 00.042 5.044 4.894 4.894 0 004.238 2.414h8.099c1.82 0 3.437-.957 4.32-2.559a4.956 4.956 0 00-.04-4.9v.002zM9.948 3.306a3.107 3.107 0 012.78 1.583l1.325 2.308c.5.871.697 1.203 1.002 1.559l-.066.093c-.455-.184-1.201-.212-1.885-.082-.757.144-1.38.48-1.48.538a3.229 3.229 0 01-3.241.005A3.272 3.272 0 016.93 7.536c-.428-1.218.012-2.562.96-3.417a3.107 3.107 0 012.058-.813h-.001zM3.253 15.158a3.142 3.142 0 01-.027-3.213L4.55 9.637c.499-.872.687-1.209.84-1.653l.114.011c.069.488.418 1.153.872 1.684a5.283 5.283 0 001.203 1.02 3.27 3.27 0 01.824 4.973c-.834.981-2.212 1.27-3.421.872a3.126 3.126 0 01-1.73-1.386zm13.55-.094a3.105 3.105 0 01-2.751 1.63h-2.65c-1 0-1.383.006-1.842.093l-.047-.104c.386-.305.783-.94 1.013-1.601a5.342 5.342 0 00.277-1.558 3.27 3.27 0 011.616-2.826 3.235 3.235 0 012.253-.378c1.262.236 2.2 1.292 2.46 2.545.16.737.05 1.513-.328 2.199z"></path></svg>
          <Text fontSize={14}>Answers</Text>
           <Text color= {"#d1450eff"}  fontSize={12} ml={-1} fontWeight={"semibold"}>BETA</Text>
        </Flex>
       
        <Flex width={"86%"}  justifyContent={"flex-start"} alignItems={"center"} gap={3} padding={3} paddingLeft={5} borderRadius={7} cursor={"pointer"} _hover={{ bgColor: "whiteAlpha.200",color:"white" }} zIndex={5} color={"#ccc"}>
          <PiCirclesThreeBold size={20} />
          <Text fontSize={14}>Explore</Text>
        </Flex>

        {/* these 2 only incase of logged in  */}
        {isSignedIn&&(
          <>
          <Flex width={"86%"}  justifyContent={"flex-start"} alignItems={"center"} gap={3} padding={3} paddingLeft={5} borderRadius={7} cursor={"pointer"} _hover={{ bgColor: "whiteAlpha.200", color: "white" }} zIndex={5} color={"#ccc"}>
            <svg rpl=""  fill="currentColor" height="20" icon-name="all" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M10 1a9 9 0 10.001 18.001A9 9 0 0010 1zm4.9 14.26V7.04h-1.8v9.45c-.68.33-1.42.55-2.2.65V10H9.1v7.14c-.78-.1-1.52-.32-2.2-.65v-3.46H5.1v2.23C3.69 13.94 2.8 12.08 2.8 10c0-3.97 3.23-7.2 7.2-7.2s7.2 3.23 7.2 7.2c0 2.08-.89 3.95-2.3 5.26z"></path></svg>
            <Text fontSize={14}>All</Text>
          </Flex>
          <Flex width={"86%"}  justifyContent={"flex-start"} alignItems={"center"} gap={3} padding={3} paddingLeft={5} borderRadius={7} cursor={"pointer"} _hover={{ bgColor: "whiteAlpha.200", color: "white" }} zIndex={5} color={"#ccc"} onClick={onOpen}>
            <FaPlus size={20} />
            <Text fontSize={14}>Start a community</Text>
          </Flex>
          </>)}

        {/* these 2 only incase of logged in  */}
        
        <Flex width={"86%"} borderTop={"0.11px solid #333"}/>        
        {/*GAMES BUTTON  */}
          <Flex width={"86%"} justifyContent={"flex-start"} alignItems={"center"} gap={3} padding={3} paddingLeft={5} borderRadius={7} cursor={"pointer"} _hover={{ bgColor: "whiteAlpha.200" }} zIndex={5} color={"#6e848dff"} onClick={() => setIsGameClicked(state => !state)}>
            <Text fontSize={"13.5px"} fontFamily={"system-ui"}>GAMES ON REDDIT</Text>
            <IoIosArrowUp size={19} style={{ verticalAlign: "text-top", marginLeft: "auto", alignSelf: "flex-start", transition: "transform 0.3s ease", transform: isGameClicked ? "rotate(0deg)" : "rotate(180deg)" }} />
          </Flex>
         <GamesDropDownMenu isGameClicked={isGameClicked}/>

          {/*FEEDS BUTTON  */}
          <Flex width={"86%"} justifyContent={"flex-start"} alignItems={"center"} gap={3} padding={3} paddingLeft={5} borderRadius={7} cursor={"pointer"} _hover={{ bgColor: "whiteAlpha.200" }} zIndex={5} color={"#6e848dff"} onClick={() => setIsFeedClicked(state => !state)}>
            <Text fontSize={"13.5px"} fontFamily={"system-ui"}>CUSTOM FEEDS</Text>
            <IoIosArrowUp size={19} style={{ verticalAlign: "text-top", marginLeft: "auto", alignSelf: "flex-start", transition: "transform 0.3s ease", transform: isFeedClicked ? "rotate(0deg)" : "rotate(180deg)" }} />
          </Flex>
         <FeedsDropDownMenu isFeedClicked={isFeedClicked}/>

          {/*COMMUNTIES BUTTON  */}
          <Flex width={"86%"} justifyContent={"flex-start"} alignItems={"center"} gap={3} padding={3} paddingLeft={5} borderRadius={7} cursor={"pointer"} _hover={{ bgColor: "whiteAlpha.200" }} zIndex={5} color={"#6e848dff"} onClick={() => setIsCommunitiesClicked(state => !state)}>
            <Text fontSize={"13.5px"} fontFamily={"system-ui"}>COMMUNITIES</Text>
            <IoIosArrowUp size={19} style={{ verticalAlign: "text-top", marginLeft: "auto", alignSelf: "flex-start", transition: "transform 0.3s ease", transform: isCommunitiesClicked ? "rotate(0deg)" : "rotate(180deg)" }} />
          </Flex>
         <CommuntiesDropDownMenu isCommunitiesClicked={isCommunitiesClicked} userCommunities={userCommunities} router={router} setCommunity={setCommunity}/>

        {/*RESOURCE BUTTON  */}
        <Flex width={"86%"} justifyContent={"flex-start"} alignItems={"center"} gap={3} padding={3} paddingLeft={5} borderRadius={7} cursor={"pointer"} _hover={{ bgColor: "whiteAlpha.200"}} zIndex={5} color={"#6e848dff"} onClick={()=>setIsResourceClicked(state=> !state)}>
          <Text fontSize={"13.5px"} fontFamily={"system-ui"}>RESOURCES</Text>
          <IoIosArrowUp size={19} style={{verticalAlign:"text-top", marginLeft:"auto", alignSelf:"flex-start", transition: "transform 0.3s ease", transform: isResourceClicked ? "rotate(0deg)" : "rotate(180deg)"}} />
        </Flex>
         <ResourceDropDownMenu isResourceClicked={isResourceClicked}/>
          <a href="" style={{ width: "86%", padding: 10, fontSize: 11, fontFamily: "system-ui", color: "#aaa",marginTop:"auto",alignSelf:"center"}}>Reddit, Inc. © 2025. All rights reserved.</a>
      </Flex>
      <CreateCommunityModal isOpen={isOpen} onClose={onClose}/>
    </Flex>
  )
}

export default SideBar;