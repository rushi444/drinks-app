import React, { FC, useState } from 'react';
import { Box, Input, Button } from '@chakra-ui/core';
import { IComment } from '../types';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_COMMENT } from '../graphql';

interface IProps {
  comments: IComment[];
  recipeId: number;
}

export const Comments: FC<IProps> = ({ comments, recipeId }) => {
  const [text, setText] = useState('');
  const [createComment] = useMutation(CREATE_COMMENT, {
    variables: {
      recipeId, text
    }, onCompleted: () => setText('')
  });
  return (
    <Box>
      <h1>Comments</h1>
      <Box display='flex'>
        <Input
          type='text'
          name='text'
          placeholder='add a comment...'
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        />
        <Button onClick={(): any => createComment()}>Post</Button>
      </Box>
      {comments?.map((comment, index) => (
        <Box key={index}>
          {comment.text} By: {comment.createdBy.name}
        </Box>
      ))}
    </Box>
  );
};
