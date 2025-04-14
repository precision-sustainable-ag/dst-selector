/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/*
  This file contains the HelpComponent, helper functions, and styles
  The HelpComponent is a static  help page that has FAQ, how to use, data dictionary, and information sheets
  RenderContent contains all the text listed in the about section
  styled using CustomStyles from ../../shared/constants
*/

import {
  Box, Container, Link, Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { defaultFaqs, wcccFaqs } from '../../../shared/constants';

const FAQ = () => {
  const councilShorthand = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const faqs = councilShorthand === 'WCCC' ? wcccFaqs : defaultFaqs;

  return (
    <Box sx={{ border: 0.5, borderColor: 'grey.300' }} ml={2} mr={2} mt={5}>
      <Typography component="div" variant="body1" align="left">
        <ol>
          {faqs.map(((faq) => (
            <>
              <li><b>{faq.question}</b></li>
              <Container style={{ marginBottom: '3%' }}>
                {faq.answer}
                {faq.id === 12 && (
                <>
                  <br />
                  <Link to="/feedback">Send us feedback!</Link>
                  {' '}
                  Let us know.
                </>
                )}
              </Container>
            </>
          )))}
        </ol>
      </Typography>
    </Box>
  );
};

export default FAQ;
