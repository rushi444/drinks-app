import React, { FC } from 'react';
import { Box } from '@chakra-ui/core';
import { IComment } from '../types';

interface IProps {
  comments: IComment[];
}

export const Comments: FC<IProps> = ({ comments }) => {
  return (
    <Box>
      <h1>Comments</h1>
      {comments?.map((comment, index) => (
        <Box key={index}>
          {comment.text} By: {comment.createdBy.name}
        </Box>
      ))}
    </Box>
  );
};
