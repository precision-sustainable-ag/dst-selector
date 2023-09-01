import {
  Grid,
  Typography,
  Container,
  Link,
} from '@mui/material';
import React from 'react';

const RouteNotFound = () => (
  <section className="page_404">
    <Container maxWidth="sm">
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <div className="four_zero_four_bg">
            <Typography variant="h1" component="h1" className="text-center">
              404
            </Typography>
          </div>

          <div className="contant_box_404" style={{ textAlign: 'center' }}>
            <Typography variant="h3" component="h2">
              Looks like you&apos;re lost
            </Typography>

            <Typography variant="body1">
              The page you are looking for is not available!
            </Typography>

            <Link href="/" className="link_404">
              Go Home
            </Link>
          </div>
        </Grid>
      </Grid>
    </Container>
  </section>
);

export default RouteNotFound;
