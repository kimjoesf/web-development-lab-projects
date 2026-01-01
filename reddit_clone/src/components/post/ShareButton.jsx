import { Flex, Menu, MenuButton, MenuItem, MenuList, Portal } from '@chakra-ui/react';
 

const ShareButton = () => {
    const shareButtonData = [
        {label:"Copy link",path:"M14.088 11.843a.9.9 0 01-.637-1.536l1.97-1.971a2.66 2.66 0 000-3.757c-1.003-1.003-2.754-1.005-3.756 0L9.694 6.55A.9.9 0 118.42 5.278l1.97-1.971a4.427 4.427 0 013.152-1.306c1.19 0 2.31.463 3.152 1.305a4.463 4.463 0 010 6.303l-1.971 1.971a.897.897 0 01-.637.264v-.001zm-4.48 4.851l1.97-1.97a.9.9 0 10-1.273-1.272l-1.97 1.97c-1.003 1.004-2.755 1.002-3.757 0a2.66 2.66 0 010-3.757l1.97-1.971a.898.898 0 000-1.272.901.901 0 00-1.272 0l-1.971 1.971a4.463 4.463 0 000 6.303 4.43 4.43 0 003.152 1.305c1.19 0 2.31-.465 3.151-1.307zm-.747-4.282l3.55-3.55a.9.9 0 10-1.272-1.273l-3.551 3.55a.9.9 0 00.637 1.537.9.9 0 00.637-.263l-.001-.001z"},
        {label:"Crosspost",path:"M15.836 11.663a.9.9 0 10-1.273 1.273l1.364 1.363H11.9A4.103 4.103 0 017.801 10.2v-.4A4.103 4.103 0 0111.9 5.701h4.027l-1.364 1.363a.9.9 0 101.274 1.273l2.9-2.9a.9.9 0 000-1.273l-2.9-2.9a.9.9 0 10-1.273 1.273L15.928 3.9h-4.027c-3.015 0-5.507 2.276-5.855 5.2H1.9a.9.9 0 000 1.8h4.145c.348 2.923 2.839 5.2 5.855 5.2h4.026l-1.363 1.362a.9.9 0 101.274 1.273l2.9-2.899a.903.903 0 000-1.274l-2.9-2.9-.001.001z "},
        {label:"Embed",path:"M8.704 17a.9.9 0 01-.88-1.087l2.594-12.201a.9.9 0 111.759.374L9.583 16.287a.9.9 0 01-.879.713zm-2.567-1.764a.898.898 0 000-1.272L2.173 10l3.964-3.964a.9.9 0 10-1.273-1.272l-4.6 4.599a.898.898 0 000 1.272l4.6 4.6a.897.897 0 001.274 0l-.001.001zm9 0l4.6-4.6a.898.898 0 000-1.272l-4.6-4.6a.9.9 0 10-1.273 1.272L17.828 10l-3.964 3.964a.898.898 0 00.637 1.536c.231 0 .46-.088.636-.264z"},    
    ];

  return (
    <Menu placement='bottom-start'>
       <MenuButton width={"fit-content"} height={"fit-content"}>
            <Flex justifyContent={"center"} alignItems={"center"} gap={2}>
            <svg rpl="" aria-hidden="true" fill="currentColor" height="16" icon-name="share" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M12.8 17.524l6.89-6.887a.9.9 0 000-1.273L12.8 2.477a1.64 1.64 0 00-1.782-.349 1.64 1.64 0 00-1.014 1.518v2.593C4.054 6.728 1.192 12.075 1 17.376a1.353 1.353 0 00.862 1.32 1.35 1.35 0 001.531-.364l.334-.381c1.705-1.944 3.323-3.791 6.277-4.103v2.509c0 .667.398 1.262 1.014 1.518a1.638 1.638 0 001.783-.349v-.002zm-.994-1.548V12h-.9c-3.969 0-6.162 2.1-8.001 4.161.514-4.011 2.823-8.16 8-8.16h.9V4.024L17.784 10l-5.977 5.976z"></path></svg>
                <p style={{ fontSize: 11, fontWeight: "bold", margin: 0 }}>Share</p>
            </Flex>
       </MenuButton>
        <MenuList bgColor={"#181C1F"} color={"#ccc"} border={"none"} minWidth={"fit-content"} p={2}>
            {shareButtonData.map(e=>(
            <MenuItem key={e.label} bgColor={"#181C1F"} minWidth={"fit-content"} height={"40px"} justifyContent={"flex-start"} alignItems={"center"} _hover={{color:"white"}} gap={4} mb={3}>
                <svg rpl="" fill="currentColor" height="20" icon-name="notifications" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d={e.path}></path></svg>
                <p>{e.label}</p>
                </MenuItem>
            ))}
        </MenuList> 
    </Menu> 
  )
}

export default ShareButton; 