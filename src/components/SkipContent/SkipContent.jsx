import React from 'react';
import { Link } from '@mui/material';

const SkipContent = ({ href, text }) => (
  <Link
    href={href}
    underline="none"
    sx={{
      position: 'fixed',
      left: '16px',
      color: 'white',
      backgroundColor: '#598444',
      outlineOffset: '5px',
      outlineColor: 'black',
      padding: '8px 16px',
      border: '1px solid #4f5c69',
      borderRadius: '12px',
      fontWeight: 'bold',
      zIndex: 1001,
      top: '-80px',
      transition: 'top 195ms cubic-bezier(0.4, 0, 1, 1)',
      '&:focus': {
        top: '16px',
        transition: 'top 225ms cubic-bezier(0, 0, 0.2, 1)',
      },
      '&:hover': {
        color: 'black',
        backgroundColor: '#f0f7eb',
      },
    }}
  >
    {text}
  </Link>
);

export default SkipContent;
