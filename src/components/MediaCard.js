import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StarRate from '@material-ui/icons/StarRate';
import DateRange from '@material-ui/icons/DateRange';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    minWidth: 345,
    maxHeight: 350,
    minHeight: 350,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  media: {
    height: 140,
    backgroundPosition: 'top'
  }
});

export default function MediaCard({ movie }) {
  const classes = useStyles();
  const {
    title,
    poster_path,
    release_date,
    id,
    vote_average,
    overview
  } = movie;

  return (
    <Card className={classes.card}>
      <Link
        to={`/movie/${id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`https://image.tmdb.org/t/p/w500${poster_path}`}
            title={title}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {title}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {`${overview.slice(0, 100)}...`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Link to={`/movie/${id}`} style={{ textDecoration: 'none' }}>
          <Button size='small' color='default'>
            Learn More
          </Button>
        </Link>
        <Typography
          variant='body2'
          color='textSecondary'
          component='p'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {vote_average}
          <StarRate />
        </Typography>
        <Typography
          variant='body2'
          color='textSecondary'
          component='p'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {release_date}
          <DateRange />
        </Typography>
      </CardActions>
    </Card>
  );
}
