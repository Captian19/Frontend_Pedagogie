import React from 'react';
import { Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, blue } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    backgroundColor:'#FFF',
    boxShadow:'5px 5px 10px ',
    borderRadius:'20px'
    
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: blue[500],
  },
}));


function SingleStage(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root} style={{marginBottom:'2em'}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.photo}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">

            <Link  to={{pathname:`/etudiant/stage/mes_stages/lettre/${props.nom_entreprise}`}}>
              {props.genie != "GIT" && 
              <>
            <button className="btn btn-pill btn-outline-default">Lettre de Stage</button>
            
            </>
            }
            </Link>
          </IconButton>
        }
        title={props.nom_entreprise}
        subheader={props.telephone}
      />
      
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.debut && <>
          <br></br>
            De {props.debut} à {props.fin} 
          </>}
        </Typography>
        <h4 align="center"  style={{fontStyle:'italic', color:'#21618C', fontFamily:'impact'}}> {props.classe}  {props.year}</h4>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
           {props.nom_entreprise}
        </IconButton>


       
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography paragraph>{props.maitre && <> Maitre de Stage : {props.maitre}</>}</Typography>
        <hr/>
        {props.maitre && 
        <>
          <Typography paragraph><h2>Notes </h2></Typography>

          {(Object.entries(props.note)).map(function (item, index) {
            return (
              <div style={{marginLeft:'4em'}}>
                <Typography paragraph key={index} style={{textAlign:'left'}}>
                  <span style={{ color: "grey", fontStyle: "italic" }}>{String(item[0])}</span> : 
                  <span style={{ color: "green", fontWeight: "bold", marginLeft:'0.5em' }}>{String(item[1])}</span>
                </Typography>
              </div>
            );
          })}
        <hr/>


          <Typography paragraph><h3>Appréciations</h3></Typography>
          {props.appreciations && props.appreciations.map(function (item, index) {
            return (
              <div style={{ color: "grey", fontStyle: "italic" }}>
                <Typography paragraph key={index}>
                  "{String(item["appreciations"])}"
                </Typography>
              </div>
            );
          })}

          </>
        }

          
        </CardContent>
      </Collapse>
    </Card>
  );
}



export default SingleStage;