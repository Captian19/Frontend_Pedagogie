import React, { Component } from 'react';
import { red, blueGrey } from '@material-ui/core/colors';
import TableCell from '@material-ui/core/TableCell';
import { Link } from 'react-router-dom';
import { convertIdCourseToLibelle, getProfFromId } from '../../../actions/Planning&Notes/planning_functions';
import { IconButton } from '@material-ui/core';
// import List from '@material-ui/icons/List';
import List from '@material-ui/icons/ListTwoTone';

export default class SeanceViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cours: "",
            duree: "",
            prof: "",
            active: true,
        };

        this.handleView = this.handleView.bind(this);
        this.activeChanger = this.activeChanger.bind(this);
    }

    // Function for changing the status of this SeanceCell by displaying it or not
    activeChanger() {
        /*
        For just changing the activite of the cell (true or false)
        After the component mounts, we will proceed to this following steps:

            First we look in all the cells that has to hange
            If this Seancecell is in this array, we change the state
            After that we tell to the parent that we've changed the state
        */
        const cells_to_change = this.props.cells_to_change;

        for (var i = 0; i < cells_to_change.length && this.state.active; i++) {
            if (cells_to_change[i] === this.props.id) {
                this.setState(state => ({
                    active: !state.active,
                }));
            }
        }
    }

    handleView() {
        /*
        Fetching the values of the cell and telling the parent the cells to change
        
        The role of this function is to set the informations about the current course
        After that it will tell to the parent the cells to change for a span
        */
        const values = this.props.seance;
        // console.log(values);

        if (values != null) {
            this.setState(
                values,
            );
            const duree = values.duree;
            const jour = values.jour;
            const heureDebut = values.heureDebut;

            var cells_to_change = [];
            if (duree > 1) {
                for (var i = parseInt(heureDebut) + 1; i < parseInt(heureDebut) + parseInt(duree); i++) {
                    var id_cell = jour + i

                    cells_to_change.push(id_cell);
                }
            }
            this.props.cellChanger(cells_to_change);
        }

    }


    componentDidUpdate() {
        this.activeChanger();
    }

    componentDidMount() {
        this.handleView();
    }

    render() {
        const active = this.state.active;
        const courses = this.props.courses;
        const profs = this.props.profs;
        return (
            active == true ? // If this cell is active, we display it
                this.state.duree != "" ?
                    <TableCell rowSpan={this.state.duree} style={this.state.cours ? { backgroundColor: blueGrey[100], borderWidth: 1, borderStyle: "solid", borderTopWidth: 1.5, borderTopStyle: 'dashed', } : {}}>
                        {this.state.prof == this.props.role.id ?
                            <React.Fragment>
                                <Link to={"/" + this.props.role.type.toLowerCase() + "/remplir-cahier-de-texte/" + this.props.id_planning + "/" + this.props.id}>
                                    <div>
                                        <center>
                                            {courses != undefined ? convertIdCourseToLibelle(courses, this.state.cours) : this.state.cours}
                                        </center>
                                        <center style={{ fontStyle: "italic" }}>
                                            {getProfFromId(profs, this.state.prof)}
                                        </center>
                                        <center>
                                            Duree: {this.state.duree + " heure(s)"}
                                        </center>
                                    </div>
                                </Link>
                                {this.props.enseignant == true ?
                                    <Link to={"/enseignant/faire-l-appel/" + this.props.id_planning + "/" + this.props.id}>
                                        <IconButton>
                                            <List color="secondary" />
                                        </IconButton>
                                    </Link>
                                    : null
                                }
                            </React.Fragment>
                            :
                            <div>
                                <center>
                                    {courses != undefined ? convertIdCourseToLibelle(courses, this.state.cours) : this.state.cours}
                                </center>
                                <center style={{ fontStyle: "italic" }}>
                                    {getProfFromId(profs, this.state.prof)}
                                </center>
                                <center>
                                    Duree: {this.state.duree + " heure(s)"}
                                </center>
                            </div>
                        }
                    </TableCell>
                    :
                    <TableCell></TableCell>
                : // else we hide it
                null
        );
    }
}
