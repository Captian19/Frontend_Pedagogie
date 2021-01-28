import React, { Component } from 'react';
import { save } from "../../../../../actions/Planning&Notes/planning_services";
import { loadCourses, loadProfs } from "../../../../../actions/Planning&Notes/planning_functions";
import ReSeanceCell from '../../../../../components/Planning&Notes/planning_components/re_seanceCell';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, Typography } from '@material-ui/core/';
import DatePicker from '../../../../../components/Planning&Notes/planning_components/datePicker';
import Grid from '@material-ui/core/Grid';
import Send from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import ProgressionsOverview from '../../../../../components/Planning&Notes/cahier_de_texte_components/progressions_overview';

// Routing
import { Redirect } from "react-router-dom";

// For the dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

// Reducer
import { connect } from "react-redux";
import LoadingSpinner from '../../../../../components/Planning&Notes/loading_spinner';
import axios from 'axios';

// const id_classe = "5fc6248e553f96cabf181026";
// Styling part!
const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);


const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);


const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
});


// For the transition of the dialog box
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

// For creating a row of celles
function createCells(heureDebut, plage) {
	return { heureDebut, plage };
}

var seances = []; // For storing all the seances

class Tabler extends Component {
	constructor(props) {
		super(props);
		let is_res_peda = false;
		let departement = "";
		let classe = "";
		let annee = "";
		props.auth.user.CurrentRoles.map(role => {
			if (role.role_type === "RESPONSABLE_PEDAGOGIQUE") {
				// is_res_peda = true; 
				// departement = role.departement;

				is_res_peda = true;
				departement = role.departement;
				classe = role.classe;
				annee = role.annee;
			}
		})
		// Binding to all methods we use the 'this' statement
		this.changeCells = this.changeCells.bind(this);
		this.resetCellsToChange = this.resetCellsToChange.bind(this);
		this.handleDateDebutChange = this.handleDateDebutChange.bind(this);
		this.handleDateFinChange = this.handleDateFinChange.bind(this);
		this.submit = this.submit.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.addSeance = this.addSeance.bind(this);
		this.loader = this.loader.bind(this);

		// We create the rows containing the Cells of Seance named ReSeanceCell
		// cf to the createCells function
		this.rows_matin = [
			createCells(8, '8h-9h'),
			createCells(9, '9h-10h'),
			createCells(10, '10h-11h'),
			createCells(11, '11h-12h'),
		];
		this.rows_soir = [
			createCells(15, '15h-16h'),
			createCells(16, '16h-17h'),
			createCells(17, '17h-18h'),
			createCells(18, '18h-19h'),
		];
		this.state = {
			cells_to_change: [], // To store the cells to change when we use a span or delete a span
			taken_cells: [],
			dateDebut: "",
			dateFin: "",
			open: false,
			courses: [],
			profs: [],
			is_res_peda: is_res_peda,
			classe: classe,
			departement: departement,
			annee: annee,
			id_planning: this.props.match.params.id_planning,
			loading: true,
			new_id_planning: ""
		}

	}


	componentDidMount() {
		if (this.state.loading) {

			this.state.loading ? axios.get("http://localhost:8000/api/plannings/planning/" + this.state.id_planning + "/").then(response => {
				const data = response.data;
				this.setState({
					id_planning: data._id,
					loading: false,
					dateDebut: data.dateDebut,
					dateFin: data.dateFin,
					seances: JSON.parse(data.seances),
					classe: data.classe,
				})
				this.loader(data.classe.niveau, data.classe.departement);
			}) : console.log(""); //this.setState({loading: false});
		}
		else {
			this.loader(this.state.classe.niveau, this.state.classe.departement)
		}
	}

	changeCells(cells_to_change, pionner) { // For managing the cells to change after a span
		var all_cells = [...cells_to_change, pionner];
		console.log(all_cells);
		var taken_cells = this.state.taken_cells;
		for (var i = 0; i < all_cells.length; i++) {
			if (taken_cells.includes(all_cells[i])) taken_cells.splice(taken_cells.indexOf(all_cells[i]), 1);

			else taken_cells.push(all_cells[i]);
		}
		this.setState( state => ({
			cells_to_change: [...state.cells_to_change, ...cells_to_change],
			taken_cells: taken_cells
		}));
		// this.setState({
		// 	cells_to_change: cells_to_change,
		// 	taken_cells: taken_cells
		// });
	}

	resetCellsToChange() {
		/*
			After telling the child component the cells to be changed, we reset the 'cells_to_change' state variable in order to avoid infinite change
		*/
		this.setState({
			cells_to_change: [],
		})
	}

	addSeance(seance) {
		/*
			Method for adding a new new seance to the array of seances
		*/

		seance["id"] = seance.jour + seance.heureDebut;
		seance["cahierSeance"] = {};
		seances.push(seance);
	}

	deleteSeance(id) {
		/*
		Methode for delete the seance in the array of submitted seances when we click the 'SUPPRIMER' button.
		*/
		var index = 0;  // For storing the current index 
		seances.map(sce => {
			const idsce = sce.jour + sce.heureDebut;
			if (id === idsce) {
				seances.splice(index, 1); // Deleting the seance at index i and returning the new array of seances
				return null;
			}
			index++;
			return null;
		});
	}

	handleDateDebutChange(target) {
		/*
		Handle the change of date debut component
		*/
		this.setState({
			dateDebut: target.value,
		});
	}

	handleDateFinChange(target) {
		/*
		Handle the change of date Fin component
		*/
		this.setState({
			dateFin: target.value,
		});
	}

	async submit() {
		/*
		 * For submitting the planning after the user save it.
		 * We will check if all the fields are done.
		 */
		if (this.state.dateDebut == "" || this.state.dateFin == "" || seances.length == 0) {
			this.setState({
				open: true,
				dialog_content: "Veuillez vérifier les aspects suivants:\n\nLe planning n'est n'est pas vide, \nLa date de début du planning est bien définie, \nLa date de fin du planning est bien définie."
			});
		}
		else {
			const result = await save(this.state.classe, this.state.departement, this.state.dateDebut, this.state.dateFin, seances, this.state.annee);
			if (result.status < 400) {
				console.log("Planning sauvegardé");
				this.setState({
					new_id_planning: result.data._id,
				})
			}
			else this.setState({
				open: true,
				dialog_content: "Problème de communication avec le serveur. Veuillez réessayer plus tard"
			})
		}
	}

	handleClose() {
		/**
		 * For closing the Dialog
		 */
		this.setState({
			open: false,
		});
	}

	/**
	 * This function is for loading the courses of the classe and the professors.
	 * @param {int} classe 
	 */
	loader = async () => {
		var seances = [];

		await axios.get("http://localhost:8000/api/plannings/planning/" + this.state.id_planning + "/").then(response => {
			seances = JSON.parse(response.data.seances);
		})
		await loadCourses(this.state.classe, this.state.departement).then(response => {

			return response;
		}).then(async (courses) => {
			await loadProfs(this.state.departement).then(response => {
				return response;
			}).then((profs) => {
				this.setState({
					seances: seances,
					courses: courses,
					profs: profs,
					loading: false
				});
			})
		});
	}

	/**
	 * For giving the value of a given cell
	 * Will return the value if the value is founded
	 * Will return null if the value of this cell is not found
	 * @param {String} id_cell 
	 */
	getValueOfCell(id_cell) {
   
        var seance = {};
        for (var index = 0; index < this.state.seances.length; index++) {
            if (this.state.seances[index].id == id_cell) {
                seance = this.state.seances[index];
                return seance;
            }
        }
        return null;
    }
	componentDidMount() {
		console.log("Getting the stuff")
		this.state.is_res_peda ? this.loader() : console.log("");
	}

	render() {
		const loading = this.state.loading == true || this.state.profs.length == 0 || this.state.courses.length == 0;
		return (
			loading ?
				<LoadingSpinner loading={loading} /> :
				this.state.is_res_peda ?
					<div style={{ marginLeft: 15, marginRight: 15 }}>
						{this.state.new_id_planning != "" ? <Redirect to={"/enseignant/voir-planning/" + this.state.new_id_planning} /> : null}
						<Dialog
							open={this.state.open}
							TransitionComponent={Transition}
							keepMounted
							onClose={this.handleClose}
							aria-labelledby="alert-dialog-slide-title"
							aria-describedby="alert-dialog-slide-description"
						>
							<DialogTitle id="alert-dialog-slide-title">Soumission impossible!</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-slide-description">
									{this.state.dialog_content}
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={this.handleClose} color="primary">
									D'accord
			        			</Button>
							</DialogActions>
						</Dialog>
						<ProgressionsOverview niveau={this.state.classe} departement={this.state.departement} annee={this.state.annee}/>
						<TableContainer component={Paper}>
							<Table className={useStyles.table} aria-label="customized table">
								<TableHead>
									<TableRow>
										<StyledTableCell></StyledTableCell>
										<StyledTableCell align="center">Lundi</StyledTableCell>
										<StyledTableCell align="center">Mardi</StyledTableCell>
										<StyledTableCell align="center">Mercredi</StyledTableCell>
										<StyledTableCell align="center">Jeudi</StyledTableCell>
										<StyledTableCell align="center">Vendredi</StyledTableCell>
										<StyledTableCell align="center">Samedi</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{this.rows_matin.map((row, index) => (
										<StyledTableRow key={"matin" + index.toString()}>
											<StyledTableCell component="th" scope="row">
												{row.plage}
											</StyledTableCell>
											<ReSeanceCell seance={this.getValueOfCell("lundi" + row.heureDebut)} deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"lundi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} profs={this.state.profs} courses={this.state.courses} jour="lundi" />
											<ReSeanceCell seance={this.getValueOfCell("mardi" + row.heureDebut)} deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"mardi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} profs={this.state.profs} courses={this.state.courses} jour="mardi" />
											<ReSeanceCell seance={this.getValueOfCell("mercredi" + row.heureDebut)} deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"mercredi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} profs={this.state.profs} courses={this.state.courses} jour="mercredi" />
											<ReSeanceCell seance={this.getValueOfCell("jeudi" + row.heureDebut)} deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"jeudi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} profs={this.state.profs} courses={this.state.courses} jour="jeudi" />
											<ReSeanceCell seance={this.getValueOfCell("vendredi" + row.heureDebut)} deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"vendredi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} profs={this.state.profs} courses={this.state.courses} jour="vendredi" />
											<ReSeanceCell seance={this.getValueOfCell("samedi" + row.heureDebut)} deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"samedi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} profs={this.state.profs} courses={this.state.courses} jour="samedi" />
										</StyledTableRow>
									))}
									<StyledTableRow style={{ backgroundColor: red[300] }}><StyledTableCell /><StyledTableCell /><StyledTableCell /><StyledTableCell /><StyledTableCell /><StyledTableCell /><StyledTableCell /></StyledTableRow>
									{this.rows_soir.map((row, index) => (
										<StyledTableRow key={"soir" + index.toString()}>
											<StyledTableCell component="th" scope="row">
												{row.plage}
											</StyledTableCell>
											<ReSeanceCell seance={this.getValueOfCell("lundi" + row.heureDebut)} deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"lundi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} profs={this.state.profs} courses={this.state.courses} jour="lundi" />
											<ReSeanceCell seance={this.getValueOfCell("mardi" + row.heureDebut)} deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"mardi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} profs={this.state.profs} courses={this.state.courses} jour="mardi" />
											<ReSeanceCell seance={this.getValueOfCell("mercredi" + row.heureDebut)} deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"mercredi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} profs={this.state.profs} courses={this.state.courses} jour="mercredi" />
											<ReSeanceCell seance={this.getValueOfCell("jeudi" + row.heureDebut)} deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"jeudi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} profs={this.state.profs} courses={this.state.courses} jour="jeudi" />
											<ReSeanceCell seance={this.getValueOfCell("vendredi" + row.heureDebut)} deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"vendredi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} profs={this.state.profs} courses={this.state.courses} jour="vendredi" />
											<ReSeanceCell seance={this.getValueOfCell("samedi" + row.heureDebut)} deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"samedi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} profs={this.state.profs} courses={this.state.courses} jour="samedi" />
										</StyledTableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
						<Grid container justify="space-between">
							<DatePicker handleChange={this.handleDateDebutChange} label="Date de début" />
							<DatePicker handleChange={this.handleDateFinChange} label="Date de fin" />
							<Button startIcon={<Send />} color="primary" variant="contained" onClick={this.submit} style={{ height: 30, marginTop: 20, marginRight: 50 }}>
								Valider
						</Button>
						</Grid>

					</div>
					:
					<Typography variant="body1" color="textSecondary" component="p">Vous nêtes pas responsable pédagogique.</Typography>
		);
	}
}
// export default Tabler;

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, null)(Tabler)