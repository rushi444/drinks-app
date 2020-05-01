import React, { FC, useState } from 'react';
import { Box, Input, Button } from '@chakra-ui/core';
import { IComment } from '../types';
import { useMutation, useSubscription } from '@apollo/react-hooks';
import { CREATE_COMMENT, NEW_COMMENT_SUBSCRIBE } from '../graphql';
import styled from '@emotion/styled';

interface IProps {
  comments: IComment[];
  recipeId: number;
}

export const Comments: FC<IProps> = ({ comments, recipeId }) => {
  const [text, setText] = useState('');
  const [allComments, setAllComments] = useState(comments);

  useSubscription(NEW_COMMENT_SUBSCRIBE, {
    variables: {
      recipeId,
    },
    onSubscriptionData: (data) =>
      setAllComments([...allComments, data.subscriptionData.data.newComment]),
  });

  const [createComment] = useMutation(CREATE_COMMENT, {
    variables: {
      recipeId,
      text,
    },
    onCompleted: () => setText(''),
  });
  return (
    <Box>
      <Box as='h1' fontSize='lg'>
        Comments
      </Box>
      <Box display='flex'>
        <Input
          type='text'
          name='text'
          size='sm'
          placeholder='add a comment...'
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
        />
        <Button
          size='sm'
          variant='outline'
          variantColor='purple'
          onClick={(): any => createComment()}>
          Post
        </Button>
      </Box>
      <Box height='auto'>
        {allComments?.map((comment, index) => (
          <CommentContainer
            key={index}
            display='flex'
            justifyContent='space-between'>
            <Box>{comment.text}</Box>
            <Box>By: {comment.createdBy.name}</Box>
          </CommentContainer>
        ))}
      </Box>
    </Box>
  );
};

const CommentContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 1%;
`;
