import React from 'react';
import { Link, useHistory } from "react-router-dom";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import './ChallengeDiv.css'
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    width: '100$',
  transitionDuration: '0.3s',
  height: 'auto'
  },
  cardDetails: {
    flex: 1,
  },
  
  cardMedia: {
    width: 160,
  },
});
var cardStyle = {
  display: 'block',
  
}

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { title, language, description, id } = props;
  const ChallengeUrl = "/challenge/"+id

  return (
    <Grid item xs={12} md={6} >
      <Link to={ChallengeUrl}>
      <CardActionArea  >
        <Card className={`m-3 ${classes.card}`}   >
          <div className={` row ${classes.cardDetails}`}>
            <CardContent className="">
              <Typography component="h2" variant="h5">
                {/* {post.title} */}
                <Box fontWeight="fontWeightBold" >
        {title}
      </Box>
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {/* {post.date} */}
                {language}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {/* {post.description} */}
                {description}
              </Typography>
              
              <Typography variant="subtitle1" color="primary">
               Go to this Challenge Page
              </Typography>
              
            </CardContent>
          </div>
          <div className='img-background'>
            <img src='/images/code.png' className="challenge-div-image" />
          </div>
          {/* <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image="https://www.google.com/search?q=image&sxsrf=ALeKk03jBXzNzLQoHCVur6Hl2j9qJvTDmg:1619674436201&tbm=isch&source=iu&ictx=1&fir=3ZyAPZ9HqiRpwM%252Cx2dVpIPQHxAPAM%252C_&vet=1&usg=AI4_-kRJZVJM8uOH6SAUunKGJHgAj48rqA&sa=X&ved=2ahUKEwjmjq-73aLwAhVzRjABHaOLCh4Q9QF6BAgLEAE#imgrc=3ZyAPZ9HqiRpwM" title="hello"/>
          </Hidden> */}
        </Card>
      </CardActionArea>
      </Link>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};
// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 140,
//   },
// });

// export default function MediaCard() {
//   const classes = useStyles();

//   return (
//     <Card className={`m-3 ${classes.root}`}>
//       <CardActionArea>
//         <CardMedia
//           className={classes.media}
//           image="/images/js.jpg"
//           title="Contemplative Reptile"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="h2">
//             Lizard
//           </Typography>
//           <Typography variant="body2" color="textSecondary" component="p">
//             Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
//             across all continents except Antarctica
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
//         <Button size="small" color="primary">
//           Share
//         </Button>
//         <Button size="small" color="primary">
//           Learn More
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }