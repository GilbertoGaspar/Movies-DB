import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import StarRate from '@material-ui/icons/StarRate';
import DateRange from '@material-ui/icons/DateRange';
import CloseIcon from '@material-ui/icons/Close';

import CircularIndeterminate from './CircularIndeterminate';
import { YOUTUBE_API_KEY, TMDB_API_KEY } from '../utils/api';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500
  },
  image: {
    width: 'auto',
    height: 'auto'
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  }
}));

//Modal Style/Logic
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default function ComplexGrid({ movieId }) {
  const classes = useStyles();
  const onMobileXsm = useMediaQuery('(min-width:500px)');
  const onMobileSm = useMediaQuery('(min-width:680px)');
  const [movieData, setMovieData] = useState({});
  const [trailerId, setTrailerId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`
      )
      .then(({ data }) => {
        setMovieData(data);
        setError(false);
        setLoading(false);
        document.body.style = `background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url("https://image.tmdb.org/t/p/original${
          data.backdrop_path
        }")`;
      })
      .catch(() => setError(true));
  }, [movieId]);

  useEffect(() => {
    if (open === true) {
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${
            movieData.title
          }%20trailer&key=${YOUTUBE_API_KEY}`
        )
        .then(({ data }) => {
          const trailerId = data.items[0].id.videoId;
          setTrailerId(trailerId);
          setError(false);
        })
        .catch(() => setError(true));
    }
  }, [open, movieData]);

  if (error) {
    return <h2>Error with your request! Please try again!</h2>;
  }
  if (loading) {
    return <CircularIndeterminate />;
  }

  const {
    title,
    overview,
    genres,
    vote_average,
    release_date,
    poster_path
  } = movieData;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container wrap={onMobileXsm ? 'nowrap' : 'wrap'} spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image} onClick={handleClickOpen}>
              <img
                className={classes.img}
                alt='complex'
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} container>
            <Grid item xs container direction='column' spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant='subtitle1'>
                  {title}
                </Typography>
                <Typography variant='body2' gutterBottom>
                  {genres.map(genre => `${genre.name} `)}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  {overview}
                </Typography>
              </Grid>
              <Grid container spacing={1}>
                <Grid item>
                  <Typography variant='body2' onClick={handleClickOpen}>
                    <Button size='small' color='default'>
                      Trailer
                    </Button>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant='body2'
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <DateRange /> {release_date}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1' style={{ display: 'flex' }}>
                {vote_average}
                <StarRate />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          {`${title} Trailer`}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <iframe
              title={title}
              width={onMobileSm ? '560' : '360'}
              height='315'
              src={`https://www.youtube.com/embed/${trailerId}`}
              frameBorder='0'
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='default'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
