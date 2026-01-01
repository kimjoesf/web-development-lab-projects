import NavFooter from '@/components/pages/NavFooter'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

const page = () => {
  return (
    <div style={{width:"60vw",height:"87vh", marginLeft:170,padding:17,display:"flex",flexDirection:"column",gap:5}}>
        <h1 style={{color:"#9db1b9ff", fontWeight:"bold", fontSize:25, alignSelf:"flex-start"}}>Notifications</h1>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center",marginTop:"30px", width:"fit-content", marginLeft:"200px"}}>
            <img style={{maxHeight:"150px",marginBottom:30}} src="https://www.redditstatic.com/shreddit/assets/snoovatar-full-hi.png" alt="Image for an empty inbox"></img>
            <p style={{color:"white", fontSize:16,marginBottom:5}}>Turn on email digest</p>
            <p style={{color:"#6e848dff", fontSize:13,marginLeft:1}}>Stay in the loop on content from communities you</p>
            <p style={{color:"#6e848dff", fontSize:13,marginLeft:1}}>love right in your email inbox.</p>
            <Flex width={"115px"} height={"35px"}   justifyContent={"center"} alignItems={"center"} borderRadius={20} gap={2} cursor={"pointer"} bgColor={"#323D41"} color={"white"} mt={9}>
            <Text fontWeight={"bold"} fontSize={14} color={"white"}>View Settings</Text>
            </Flex>
        </div>
         <NavFooter/>
    </div>
  )
}

export default page;