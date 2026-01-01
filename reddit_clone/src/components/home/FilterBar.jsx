"use client"
import { Button, Menu, MenuButton, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
import { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
 

const FilterBar = () => {
    const [selectedItem,setSelectedItem] = useState("Best");
    const [selectedView,setSelectedView] = useState("Card");
  return (
    <div style={{display:"flex", gap:3, alignItems:"center", width:"100%",borderBottom:"0.1px solid #6e848dff",padding:5}}>
        <Menu>
            <MenuButton as={Button} rightIcon={<IoIosArrowDown size={14}/>} width={"fit-content"} height={"30px"} fontSize={12} fontWeight={"bold"} color={"#6e848dff"}  cursor={"pointer"} _hover={{bgColor:"#323D41"}} _active={{bgColor:"transparent"}} bgColor={"transparent"} borderRadius={20}>
                {selectedItem}
            </MenuButton>
            <MenuList bgColor={"#181C1F"} color={"#ccc"} border={"none"} gap={3} minWidth={"fit-content"}>
                <MenuGroup title={"Sort by"} defaultValue={selectedItem} fontWeight={"bold"} color={"#6e848dff"}>
                <MenuItem bgColor={selectedItem==="Best"  ?"whiteAlpha.300":"#181C1F"} value={"Best"} onClick={(e)=>setSelectedItem(e.currentTarget.value)} minWidth={"fit-content"} height={"50px"} _hover={{color:"White"}}>Best</MenuItem>
                <MenuItem bgColor={selectedItem==="Hot"   ?"whiteAlpha.300":"#181C1F"} value={"Hot"} onClick={(e)=>setSelectedItem(e.currentTarget.value)} minWidth={"fit-content"} height={"50px"} _hover={{color:"White"}}>Hot</MenuItem>
                <MenuItem bgColor={selectedItem==="New"   ?"whiteAlpha.300":"#181C1F"} value={"New"} onClick={(e)=>setSelectedItem(e.currentTarget.value)} minWidth={"fit-content"} height={"50px"} _hover={{color:"White"}}>New</MenuItem>
                <MenuItem bgColor={selectedItem==="Top"   ?"whiteAlpha.300":"#181C1F"} value={"Top"} onClick={(e)=>setSelectedItem(e.currentTarget.value)} minWidth={"fit-content"} height={"50px"} _hover={{color:"White"}}>Top</MenuItem>
                <MenuItem bgColor={selectedItem==="Rising"?"whiteAlpha.300":"#181C1F"} value={"Rising"} onClick={(e)=>setSelectedItem(e.currentTarget.value)} minWidth={"fit-content"} height={"50px"} _hover={{color:"White"}}>Rising</MenuItem>
             </MenuGroup>
            </MenuList>
        </Menu> 

          <Menu>
              <MenuButton as={Button} rightIcon={<IoIosArrowDown size={14} />} width={"fit-content"} height={"30px"} fontSize={12} fontWeight={"bold"} color={"#6e848dff"} cursor={"pointer"} _hover={{ bgColor: "#323D41" }} _active={{bgColor:"transparent"}}  bgColor={"transparent"} borderRadius={20}>
                  <svg rpl="" fill="currentColor" height="16" icon-name="card" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.7 2H5.3C3.48 2 2 3.48 2 5.3v9.4C2 16.52 3.48 18 5.3 18h9.4c1.82 0 3.3-1.48 3.3-3.3V5.3C18 3.48 16.52 2 14.7 2zM5.3 3.8h9.4c.83 0 1.5.67 1.5 1.5v3.8H3.8V5.3c0-.83.67-1.5 1.5-1.5zm9.4 12.4H5.3c-.83 0-1.5-.67-1.5-1.5v-3.8h12.4v3.8c0 .83-.67 1.5-1.5 1.5z"></path>
                  </svg>
              </MenuButton>
              <MenuList bgColor={"#181C1F"} color={"#ccc"} border={"none"} minWidth={"fit-content"}> 
                <MenuGroup title={"View"} defaultValue={selectedView} fontWeight={"bold"} color={"#6e848dff"}>
                  <MenuItem bgColor={selectedView==="Card"?"whiteAlpha.300":"#181C1F"} value={"Card"} onClick={(e)=>setSelectedView(e.currentTarget.value)} gap={2} minWidth={"fit-content"} height={"50px"} justifyContent={"center"} _hover={{color:"White"}}>
                  <span>Card</span> 
                      <svg rpl="" fill="currentColor" height="16" icon-name="card" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.7 2H5.3C3.48 2 2 3.48 2 5.3v9.4C2 16.52 3.48 18 5.3 18h9.4c1.82 0 3.3-1.48 3.3-3.3V5.3C18 3.48 16.52 2 14.7 2zM5.3 3.8h9.4c.83 0 1.5.67 1.5 1.5v3.8H3.8V5.3c0-.83.67-1.5 1.5-1.5zm9.4 12.4H5.3c-.83 0-1.5-.67-1.5-1.5v-3.8h12.4v3.8c0 .83-.67 1.5-1.5 1.5z"></path>
                      </svg>
                  </MenuItem>
                  <MenuItem bgColor={selectedView==="Compact"?"whiteAlpha.300":"#181C1F"} value={"Compact"} onClick={(e)=>setSelectedView(e.currentTarget.value)} gap={2} minWidth={"fit-content"} height={"50px"} justifyContent={"center"} _hover={{color:"White"}}>
                  <span>Compact</span>
                      <svg rpl="" fill="currentColor" height="16" icon-name="classic-fill" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.1 7.93H2.9a.9.9 0 00-.9.9v2.33a.9.9 0 00.9.9h14.2a.9.9 0 00.9-.9V8.83a.9.9 0 00-.9-.9zM18 5.3C18 3.48 16.52 2 14.7 2H5.3C3.48 2 2 3.48 2 5.3c0 .46.37.83.83.83h14.34c.46 0 .83-.37.83-.83zM2 14.7C2 16.52 3.48 18 5.3 18h9.4c1.82 0 3.3-1.48 3.3-3.3 0-.46-.37-.83-.83-.83H2.83c-.46 0-.83.37-.83.83z"></path>
                      </svg>
                  </MenuItem>
                </MenuGroup>
              </MenuList>
          </Menu> 
    </div>
  )
}

export default FilterBar;