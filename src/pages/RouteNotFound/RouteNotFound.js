import {
  Grid,
  Typography,
  Container,
  Link,
} from '@mui/material';
import React from 'react';

const RouteNotFound = () => (
  <Container maxWidth="sm">
    <Grid container justifyContent="center">
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            backgroundImage: 'url(/images/page_not_found.gif)',
            height: '400px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          404
        </Typography>

        <Typography variant="h3" component="h2">
          Looks like you&apos;re lost
        </Typography>

        <Typography variant="body1">
          The page you are looking for is not available!
        </Typography>

        <Link
          href="/"
          sx={{
            color: '#fff !important',
            padding: '10px 20px',
            background: '#39ac31',
            margin: '20px 0',
            display: 'inline-block',
          }}
        >
          Go Home
        </Link>
      </Grid>
    </Grid>
  </Container>
);

export default RouteNotFound;
