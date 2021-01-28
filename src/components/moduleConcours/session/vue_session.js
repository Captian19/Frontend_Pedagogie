import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


import Vue_Init_Concours from './vue_init_concours';
import Vue_Document from './vue_document';

import Vue_Statistique from "../statistique/vue_statistique";



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const useStylesCircular = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

export default function Vue_Session(props) {
  const classes = useStyles();
  const classesCircular = useStylesCircular();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Session Concours" {...a11yProps(0)} />
          <Tab label="Documents Concours" {...a11yProps(1)} />
          <Tab label="Statistique" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className={classes.root}>
            <LinearProgress /><br/><br/>
            <Vue_Init_Concours state={props.state}
                               handleChangeSess={props.handleChangeSess}
                               handleChangeCal={props.handleChangeCal}
                               handleChangeIns={props.handleChangeIns}
                               handleChangeConc={props.handleChangeConc}
                               handleChangeFin={props.handleChangeFin}
                               handleSubmitSess={props.handleSubmitSess}
                               handleSubmitCal={props.handleSubmitCal}
                               handleChangeState={props.handleChangeState}

            />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
          <Vue_Document /> 
      </TabPanel>
      <TabPanel value={value} index={2}>
            <Vue_Statistique />
      </TabPanel>
    </div>
  );
}