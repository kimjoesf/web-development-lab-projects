import React, { startTransition, useState } from 'react';
import { Modal,ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, VStack, HStack, Input, Textarea, FormControl,FormLabel,Box, SimpleGrid, Icon,Switch,Flex, Circle, Divider} from '@chakra-ui/react';
import { FaCheck } from "react-icons/fa6";
import DragAndDrop from '../createPost/DragAndDrop';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const options = [
  { emoji: '🎨', text: 'Art' },
  { emoji: '💼', text: 'Business & Finance' },
  { emoji: '🎭', text: 'Anime & Cosplay' },
  { emoji: '👗', text: 'Fashion & Beauty' },
  { emoji: '🍔', text: 'Food & Drinks' },
  { emoji: '🎮', text: 'Games' },
  { emoji: '❤️', text: 'Health' },
  { emoji: '🏡', text: 'Home & Garden' },
  { emoji: '👥', text: 'Identity & Relationships' },
  { emoji: '🌐', text: 'Internet Culture' },
  { emoji: '🎥', text: 'Movies & TV' },
  { emoji: '🎵', text: 'Music' },
  { emoji: '🌿', text: 'Nature & Outdoors' },
  { emoji: '📰', text: 'News & Politics' },
  { emoji: '🌍', text: 'Places & Travel' },
  { emoji: '⭐', text: 'Pop Culture' },
  { emoji: '❓', text: 'Q&A & Stories' },
  { emoji: '📚', text: 'Reading & Writing' },
  { emoji: '🔬', text: 'Sciences' },
  { emoji: '💀', text: 'Spooky' },
  { emoji: '⚽', text: 'Sports' },
  { emoji: '💻', text: 'Technology' },
  { emoji: '🚗', text: 'Vehicles' },
  { emoji: '🔥', text: 'Wellness' },
  { emoji: '🔞', text: 'Adult Content' },
  { emoji: '🚨', text: 'Mature options' },
];

const CreateCommunityModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [communityType, setCommunityType] = useState('public');
  const [isMature, setIsMature] = useState(false);
  const [communityName, setCommunityName] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const nameValid = communityName.length >= 3 && communityName.length <= 21 && /^[a-zA-Z0-9_]+$/.test(communityName);

  const reset = () => {
    setStep(1);
    setSelectedOption(null);
    setCommunityType('public');
    setIsMature(false);
    setCommunityName('');
    setDescription('');
    onClose();
  };

const handleCreateCommunity = () => {
  setIsLoading(true); 
  startTransition(async () => {
    try {
      let mediaBase64 = null;
      let fileName = null;
      let fileType = null;

      if (media.length > 0) {
        const file = media[0];
        fileName = file.name;
        fileType = file.type;

        mediaBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(file);
        });
      }

     const res = await axios.post("/api/createCommunity", {
        mediaBase64,
        fileName,
        fileType,
        type: communityType,
        about:selectedOption,
        name: communityName,
        description,
        mature: isMature,
      });
      const community = res.data;
       reset();
       router.push(`/r/${community.name}`);


    } catch (error) {
      alert("Failed to create community: " + error);
    }finally{setIsLoading(false)}
  });
};




  return (
    <Modal isOpen={isOpen} onClose={reset}  isCentered>
      <ModalOverlay />
      <ModalContent bg={"#181C1F"} color={"white"} borderRadius={"md"} minWidth={"70vw"}>
        <ModalHeader>
          {step === 1 && 'What will your community be about?'}
          {step === 2 && 'What kind of community is this?'}
          {step === 3 && 'Tell us about your community'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {step === 1 && (
            <VStack align="stretch" spacing={4}>
              <Text fontSize="sm" color="gray.300">
                Choose a option to help redditors discover your community
              </Text>
              <Flex wrap={"wrap"} gap={3}>
                {options.map((option, idx) => (
                  <Box width={"fit-content"} key={idx}  as="button" onClick={() => selectedOption===option.text? setSelectedOption(null) : setSelectedOption(option.text)}  bg={selectedOption === option.text ? '#2A2E31' : '#1F2326'} border="1px"  borderColor={selectedOption === option.text ? 'blue.500' : 'transparent'} borderRadius="lg"  p={2} textAlign="center" _hover={{ bg: '#2A2E31' }} transition={"all 0.2s"}>
                    <Flex width={"fit-content"} height={"fit-content"} align={"center"} justify={"center"} gap={2}>
                      {selectedOption === option.text && (
                        <Box color={"white"}>
                          <FaCheck size={17} />
                        </Box>
                      )}
                      <Text fontSize="sm">{option.emoji}</Text>
                      <Text fontSize="sm">{option.text}</Text>
                    </Flex>
                  </Box>
                ))}
              </Flex>
            </VStack>
          )}

          {step === 2 && (
            <VStack align="stretch" spacing={6}>
              <Text fontSize="sm" color="gray.300">
                Decide who can view and contribute in your community. Only public communities show up in search.
              </Text>
              <VStack align="stretch" spacing={4}>
                <Box
                  as="button"
                  onClick={() => setCommunityType('public')}
                  bg="#1F2326"
                  borderRadius="lg"
                  p={4}
                  border="2px"
                  borderColor={communityType === 'public' ? 'blue.500' : 'transparent'}
                >
                  <HStack align="start">
                    <Circle size="40px" bg="blue.500" color="white">
                      👥
                    </Circle>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="bold">Public</Text>
                      <Text fontSize="sm" color="gray.300">
                        Anyone can view, post, and comment to this community
                      </Text>
                    </VStack>
                  </HStack>
                </Box>

                <Box
                  as="button"
                  onClick={() => setCommunityType('restricted')}
                  bg="#1F2326"
                  borderRadius="lg"
                  p={4}
                  border="2px"
                  borderColor={communityType === 'restricted' ? 'blue.500' : 'transparent'}
                >
                  <HStack align="start">
                    <Circle size="40px" bg="yellow.500" color="white">
                      🔒
                    </Circle>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="bold">Restricted</Text>
                      <Text fontSize="sm" color="gray.300">
                        Anyone can view, but only approved users can contribute
                      </Text>
                    </VStack>
                  </HStack>
                </Box>

                <Box
                  as="button"
                  onClick={() => setCommunityType('private')}
                  bg="#1F2326"
                  borderRadius="lg"
                  p={4}
                  border="2px"
                  borderColor={communityType === 'private' ? 'blue.500' : 'transparent'}
                >
                  <HStack align="start">
                    <Circle size="40px" bg="red.500" color="white">
                      🔐
                    </Circle>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="bold">Private</Text>
                      <Text fontSize="sm" color="gray.300">
                        Only approved users can view and contribute
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              </VStack>

              <Divider />

              <HStack justify="space-between">
                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold">Mature (18+)</Text>
                  <Text fontSize="sm" color="gray.300">
                    Users must be over 18 to view and contribute
                  </Text>
                </VStack>
                <Switch colorScheme={"blue"} isChecked={isMature} onChange={(e) => setIsMature(e.target.checked)} />
              </HStack>
            </VStack>
          )}

          {step === 3 && (
            <VStack align="stretch" spacing={6}>
              <Text fontSize="sm" color="gray.300">
                A name and description help people understand what your community is all about.
              </Text>
              <FormControl>
                <FormLabel>Community name *</FormLabel>
                <Input
                  placeholder="communityname"
                  value={communityName}
                  onChange={(e) => setCommunityName(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                  bg="#1F2326"
                  border="none"
                  _placeholder={{ color: 'gray.500' }}
                />
                <Text fontSize="xs" color="gray.400" mt={1}>
                  {communityName.length}/21 • Letters, numbers, and underscores only
                </Text>
              </FormControl>

              <FormControl>
                <FormLabel>Description *</FormLabel>
                <Textarea
                  placeholder="Your community description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  bg="#1F2326"
                  border="none"
                  resize="vertical"
                  rows={6}
                />
              </FormControl>
                <FormControl>
                <FormLabel>Community image</FormLabel>
                <DragAndDrop uploading={uploading} setUploading={setUploading} media={media} setMedia={setMedia} from={"community"} />
              </FormControl>
            </VStack>
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant={"ghost"} bgColor={"#323D41"} color={"white"} onClick={step === 1 ? reset : handleBack} borderRadius={20} _hover={{bgColor:"#404d52ff"}}>
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
          {step < 3 && (
            <Button bgColor={"#135accff"} isDisabled={step === 1 && !selectedOption} onClick={handleNext} color={"white"} borderRadius={20} ml={5} _hover={{bgColor:"blue.500"}}>
              Next
            </Button>
          )}
          {step === 3 && (
            <Button bgColor={"#135accff"} isDisabled={!nameValid || description.trim() === ''} onClick={handleCreateCommunity} color={"white"} borderRadius={20} ml={5} _hover={{bgColor:"blue.500"}} isLoading={isLoading}>
              Create Community
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCommunityModal;