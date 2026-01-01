"use client"
import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import axios from 'axios'

const CommentThread = ({comment}) => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchReplies = async () => {
      const res = await axios.get("/api/getCommentReplies", {
        params: { commentId: comment.id },
      });
      setReplies(res.data);
    };

    fetchReplies();
  }, [comment.id]);
  return (
    <Box>
      <Comment comment={comment} replies={replies} setReplies={setReplies} />
      <Box ml={6}>
        {replies.map((reply) => (
          <CommentThread key={reply.id} comment={reply} />
        ))}
      </Box>
    </Box>
  )
}

export default CommentThread;