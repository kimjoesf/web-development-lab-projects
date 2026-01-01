import { useState } from 'react';
import { Avatar, Box, Flex,Input, InputGroup,InputLeftElement, Popover, PopoverContent, PopoverTrigger,Text, useDisclosure, VStack} from '@chakra-ui/react';
import useUserCommunitiesStore from '@/store/userComunitiesStore';
import { IoSearch } from "react-icons/io5";

 


export default function CommunitySelector({selectedCommunity,setSelectedCommunity}) {
  const [search, setSearch] = useState('');
  const {userCommunities} = useUserCommunitiesStore();
  const { isOpen, onOpen, onClose } = useDisclosure();  

  // const filteredCommunities = userCommunities.filter((community) =>
  //   community.name.toLowerCase().includes(search.toLowerCase())
  // );

  return (
    <Popover placement={"bottom-start"} isOpen={isOpen} onOpen={onOpen} onClose={onClose} autoFocus={false}>
      <PopoverTrigger >
        <Flex
          alignItems="center"
          bg="gray.700"
          borderRadius="full"
          px={3}
          py={1}
          cursor="pointer"
          color="white"
          fontSize="sm"
          _hover={{ bg: 'gray.600' }}
          w="fit-content"
          onClick={onOpen}
        >
          <Avatar size="xs" name={"r/"} src={selectedCommunity?.imageUrl} bgColor={"white"} color={"gray.700"} fontWeight={"bold"} />
          <Text ml={1}>{selectedCommunity.name?"r/"+selectedCommunity?.name :"Select a community"}</Text>
        </Flex>
      </PopoverTrigger>
      <PopoverContent bg="gray.800" border="none" w="300px" borderRadius="md" overflow="hidden" color="white">
        <InputGroup m={2}>
          <InputLeftElement pointerEvents={"none"} color={"gray.300"}>
             <IoSearch />
          </InputLeftElement>
          <Input
            pl={10}
            placeholder="/"
            value={search}
            onChange={(e) =>setSearch(e.target.value)}
            bg={"gray.700"}
            border="none"
            _placeholder={{ color: 'gray.400' }}
            _focus={{ outline: 'none' }}
          />
        </InputGroup>
        <VStack align="stretch" maxH="300px" overflowY="auto" spacing={0}>
          {userCommunities.map((community) => (
            <Flex  key={community.name}  alignItems={"center"}  p={3} _hover={{ bg: 'gray.700' }} cursor="pointer"  borderBottom="1px solid" borderColor={"gray.600"} onClick={()=>{setSelectedCommunity(community); onClose();}}>
              <Avatar size={"sm"} src={community?.imageUrl} />
              <Box ml={3}>
                <Text fontWeight="semibold">r/{community.name}</Text>
              </Box>
            </Flex>
          ))}
          {userCommunities.length === 0 && (
            <Text p={3} textAlign="center" color="gray.400">
              No communities found
            </Text>
          )}
        </VStack>
      </PopoverContent>
    </Popover>
  );
}