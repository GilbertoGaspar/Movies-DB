import React from 'react';
import { withRouter } from 'react-router';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ComplexGrid from './ComplexGrid';

function MoviePage({ match }) {
  return (
    <Container maxWidth='lg'>
      <Box m={5}>
        <ComplexGrid movieId={match.params.id} />
      </Box>
    </Container>
  );
}

export default withRouter(MoviePage);
