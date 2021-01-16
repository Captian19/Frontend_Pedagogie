import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


import AllEntreprises from './allEntreprise';


import EntrepriseClasseGenie from './entGenieClasse';





function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
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
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} style={{marginBottom : '2em', borderBottom : '0.1px solid red' }}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Tout"  {...a11yProps(0)} />
          <LinkTab label="Tronc Commun" {...a11yProps(1)} />
          <LinkTab label="DIC 1" {...a11yProps(2)} />
          <LinkTab label="DIC 2" {...a11yProps(3)} />
          <LinkTab label="DIC 3"  {...a11yProps(4)} />
        </Tabs>
      </AppBar>


      <TabPanel value={value} index={0}>
        <AllEntreprises/>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <EntrepriseClasseGenie classe ='Tronc commun' genie='Génie Civil'/>
        <EntrepriseClasseGenie classe ='Tronc commun' genie='Electro-Mecanique'/>
        <EntrepriseClasseGenie classe ='Tronc commun' genie='Informatique et Télécommunications'/>
        <EntrepriseClasseGenie classe ='Tronc commun' genie='Aéronautique'/>
      </TabPanel>


      <TabPanel value={value} index={2}>
        <EntrepriseClasseGenie classe ='DIC1' genie='Génie Civil'/>
        <EntrepriseClasseGenie classe ='DIC1' genie='Electro-Mecanique'/>
        <EntrepriseClasseGenie classe ='DIC1' genie='Informatique et Télécommunications'/>
        <EntrepriseClasseGenie classe ='DIC1' genie='Aéronautique'/>
      </TabPanel>


      <TabPanel value={value} index={3}>
        <EntrepriseClasseGenie classe ='DIC2' genie='Génie Civil'/>
        <EntrepriseClasseGenie classe ='DIC2' genie='Electro-Mecanique'/>
        <EntrepriseClasseGenie classe ='DIC2' genie='Informatique et Télécommunications'/>
        <EntrepriseClasseGenie classe ='DIC2' genie='Aéronautique'/>
      </TabPanel>

      <TabPanel value={value} index={4}>
        <EntrepriseClasseGenie classe ='DIC3' genie='Génie Civil'/>
        <EntrepriseClasseGenie classe ='DIC3' genie='Electro-Mecanique'/>
        <EntrepriseClasseGenie classe ='DIC3' genie='Informatique et Télécommunications'/>
        <EntrepriseClasseGenie classe ='DIC3' genie='Aéronautique'/>
      </TabPanel>
    </div>
  );
}
