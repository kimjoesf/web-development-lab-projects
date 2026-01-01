"use client"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Text, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const PostSummary = ({ postId, isOpen, onClose }) => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);

    const summarize = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const res = await axios.post("/api/summarizePost", { postId });
            setSummary(res.data.summary);
        } catch (e) {
            alert("Failed to summarize");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
            <ModalOverlay />
            <ModalContent bgColor={"black"} color={"white"}>
                <ModalHeader>Post Summary</ModalHeader>

                <ModalBody>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <Text whiteSpace="pre-wrap">{summary}</Text>
                    )}
                </ModalBody>

                <ModalFooter gap={5}>
                    <Button onClick={onClose}>Close</Button>
                    <Button onClick={summarize} isLoading={loading}> Summarize </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    )
}

export default PostSummary;