// import React, { Component } from 'react';
// import { save } from "./services";
// import { loadCourses } from './functions';
// import { id_classe } from "../constants";
// import SeanceCell from './components/seanceCell';
// import { withStyles, makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import { Paper } from '@material-ui/core/';
// import DatePicker from './components/datePicker';
// import Grid from '@material-ui/core/Grid';
// import Send from '@material-ui/icons/Send';
// import Button from '@material-ui/core/Button';
// import { red } from '@material-ui/core/colors';

// // For the dialog
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Slide from '@material-ui/core/Slide';

// // const id_classe = "5fc6248e553f96cabf181026";
// // Styling part!
// const StyledTableCell = withStyles((theme) => ({
// 	head: {
// 		backgroundColor: theme.palette.common.black,
// 		color: theme.palette.common.white,
// 	},
// 	body: {
// 		fontSize: 14,
// 	},
// }))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
// 	root: {
// 		'&:nth-of-type(odd)': {
// 			backgroundColor: theme.palette.action.hover,
// 		},
// 	},
// }))(TableRow);


// const useStyles = makeStyles({
// 	table: {
// 		minWidth: 700,
// 	},
// });

// // For the transition of the dialog box
// const Transition = React.forwardRef(function Transition(props, ref) {
// 	return <Slide direction="up" ref={ref} {...props} />;
// });

// // For creating a row of celles
// function createCells(heureDebut, plage) {
// 	return { heureDebut, plage };
// }

// var seances = []; // For storing all the seances

// class Tabler extends Component {
// 	constructor(props) {
// 		super(props);
// 		// Binding to all methods we use the 'this' statement
// 		this.changeCells = this.changeCells.bind(this);
// 		this.resetCellsToChange = this.resetCellsToChange.bind(this);
// 		this.handleDateDebutChange = this.handleDateDebutChange.bind(this);
// 		this.handleDateFinChange = this.handleDateFinChange.bind(this);
// 		this.submit = this.submit.bind(this);
// 		this.handleClose = this.handleClose.bind(this);	
// 		this.addSeance = this.addSeance.bind(this);
// 		this.loader = this.loader.bind(this);

// 		// We create the rows containing the Cells of Seance named SeanceCell
// 		// cf to the createCells function
// 		this.rows_matin = [
// 			createCells(8, '8h-9h'),
// 			createCells(9, '9h-10h'),
// 			createCells(10, '10h-11h'),
// 			createCells(11, '11h-12h'),
// 		];
// 		this.rows_soir = [
// 			createCells(15, '15h-16h'),
// 			createCells(16, '16h-17h'),
// 			createCells(17, '17h-18h'),
// 			createCells(18, '18h-19h'),
// 		];
// 		this.state = {
// 			cells_to_change: [], // To store the cells to change when we use a span or delete a span
// 			taken_cells: [],
// 			dateDebut: "",
// 			dateFin: "",
// 			open: false,
//             courses: [],
//             loading: true,
// 		}

// 		//this.dateDebut = new Date('2014-08-18T21:11:54');  // Stocke la date de début du planning
// 		//this.dateFin = new Date('2014-08-18T21:11:54');  // Stocke la dat de fin du planning
// 	}
// 	// We have this following format:


// 	// rows = [
// 	// 	{
// 	// 		heureDebut: 8,
// 	// 		plage: 8h-9h,
// 	// 		lundi: SeanceCell,
// 	// 		mardi: SeanceCell,
// 	// 		mercredi: SeanceCell,
// 	// 		jeudi: SeanceCell,
// 	// 		vendredi: SeanceCell,
// 	// 		samedi: SeanceCell,
// 	// 	},
// 	// 	...
// 	// ]

// 	changeCells(cells_to_change, pionner) { // For managing the cells to change after a span
// 		var all_cells = [...cells_to_change, pionner];
// 		var taken_cells = this.state.taken_cells;
// 		for (var i = 0; i < all_cells.length; i++){
// 			if (taken_cells.includes(all_cells[i])) taken_cells.splice(taken_cells.indexOf(all_cells[i]), 1);

// 			else taken_cells.push(all_cells[i]);
// 		}
// 		this.setState({
// 			cells_to_change: cells_to_change,
// 			taken_cells: taken_cells
// 		});
// 	}

// 	resetCellsToChange() {
// 		/*
// 			After telling the child component the cells to be changed, we reset the 'cells_to_change' state variable in order to avoid infinite change
// 		*/
// 		this.setState({
// 			cells_to_change: [],
// 		})
// 	}

// 	addSeance(seance) {
// 		/*
// 			Method for adding a new new seance to the array of seances
// 		*/

// 		seance["id"] = seance.jour + seance.heureDebut;
// 		seance["cahierSeance"] = {};
// 		seances.push(seance);
// 	}

// 	deleteSeance(id) {
// 		/*
// 		Methode for delete the seance in the array of submitted seances when we click the 'SUPPRIMER' button.
// 		*/
// 		var index = 0;  // For storing the current index 
// 		seances.map(sce => {
// 			const idsce = sce.jour + sce.heureDebut;
// 			if (id === idsce) {
// 				seances.splice(index, 1); // Deleting the seance at index i and returning the new array of seances
// 				return null;
// 			}
// 			index++;
// 			return null;
// 		});
// 	}

// 	handleDateDebutChange(target) {
// 		/*
// 		Handle the change of date debut component
// 		*/
// 		this.setState({
// 			dateDebut: target.value,
// 		});
// 	}

// 	handleDateFinChange(target) {
// 		/*
// 		Handle the change of date Fin component
// 		*/
// 		this.setState({
// 			dateFin: target.value,
// 		});
// 	}

// 	submit() {
// 		/**
// 		 * For submitting the planning after the user save it.
// 		 * We will check if all the fields are done.
// 		 */
// 		if (this.state.dateDebut == "" || this.state.dateFin == "" || seances.length == 0) {
// 			this.setState({
// 				open: true,
// 			});
// 		}
// 		else {
// 			save(id_classe, this.state.dateDebut, this.state.dateFin, seances);
// 		}
// 	}
	
// 	handleClose(){
// 		/**
// 		 * For closing the Dialog
// 		 */
// 		this.setState({
// 			open: false,
// 		});
// 	}
// 	loader = async (classe) => {
//         /**
//          * For loading the courses of this classe from the database
//          */
// 		loadCourses(classe).then(response => this.setState({
// 			courses: response
// 		}));
//     }
    
//     getValueOfCell(id_cell) {
//         /**
//          *For give the value of a given cell
//          *Will return the value if the value is founded
//          *Will return null if the value of this cell is not found
//          */
//         var seance = {};
//         for (var index = 0; index < this.state.seances.length; index++) {
//             if (this.state.seances[index].id == id_cell) {
//                 seance = this.state.seances[index];
//                 return seance;
//             }
//         }
//         return null;
//     }

// 	componentDidMount(){
		
//         if (this.state.loading) {
//             axios.get("http://localhost:8000/api/plannings/"+ id_classe + "/").then(response => {
//                 const data = JSON.parse(response.data)[0];
//                 this.setState({
//                     id_planning: data._id,
//                     loading: false,
//                     dateDebut: data.dateDebut,
//                     dateFin: data.dateFin,
//                     seances: JSON.parse(data.seances),
//                 });
//             });
//         }
// 		this.loader(id_classe);
// 	}
// 	render() {
// 		return (
// 			<div style={{ marginLeft: 15, marginRight: 15 }}>
// 				<Dialog
// 					open={this.state.open}
// 					TransitionComponent={Transition}
// 					keepMounted
// 					onClose={this.handleClose}
// 					aria-labelledby="alert-dialog-slide-title"
// 					aria-describedby="alert-dialog-slide-description"
// 				>
// 					<DialogTitle id="alert-dialog-slide-title">Suomission impossible!</DialogTitle>
// 					<DialogContent>
// 						<DialogContentText id="alert-dialog-slide-description">
// 							Veuillez vérifier les aspects suivants:<br></br>
// 							Le planning n'est n'est pas vide, 
// 							La date de début du planning est bien définie, 
// 							La date de fin du planning est bien définie.
// 						</DialogContentText>
// 					</DialogContent>
// 					<DialogActions>
// 						<Button onClick={this.handleClose} color="primary">
// 							D'accord
// 			        </Button>
// 					</DialogActions>
// 				</Dialog>
// 				<TableContainer component={Paper}>
// 					<Table className={useStyles.table} aria-label="customized table">
// 						<TableHead>
// 							<TableRow>
// 								<StyledTableCell></StyledTableCell>
// 								<StyledTableCell align="center">Lundi</StyledTableCell>
// 								<StyledTableCell align="center">Mardi</StyledTableCell>
// 								<StyledTableCell align="center">Mercredi</StyledTableCell>
// 								<StyledTableCell align="center">Jeudi</StyledTableCell>
// 								<StyledTableCell align="center">Vendredi</StyledTableCell>
// 								<StyledTableCell align="center">Samedi</StyledTableCell>
// 							</TableRow>
// 						</TableHead>
// 						<TableBody>
// 							{this.rows_matin.map((row, index) => (
// 								<StyledTableRow key={"matin" + index.toString()}>
// 									<StyledTableCell component="th" scope="row">
// 										{row.plage}
// 									</StyledTableCell>
// 									<SeanceCell deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"lundi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="lundi" />
// 									<SeanceCell deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"mardi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="mardi" />
// 									<SeanceCell deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"mercredi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="mercredi" />
// 									<SeanceCell deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"jeudi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="jeudi" />
// 									<SeanceCell deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"vendredi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="vendredi" />
// 									<SeanceCell deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"samedi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="samedi" />
// 								</StyledTableRow>
// 							))}
// 							<StyledTableRow style={{backgroundColor: red[300]}}><StyledTableCell/><StyledTableCell/><StyledTableCell/><StyledTableCell/><StyledTableCell/><StyledTableCell/><StyledTableCell/></StyledTableRow>
// 							{this.rows_soir.map((row, index) => (
// 								<StyledTableRow key={"soir" + index.toString()}>
// 									<StyledTableCell component="th" scope="row">
// 										{row.plage}
// 									</StyledTableCell>
// 									<SeanceCell deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"lundi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="lundi" />
// 									<SeanceCell deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"mardi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="mardi" />
// 									<SeanceCell deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"mercredi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="mercredi" />
// 									<SeanceCell deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"jeudi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="jeudi" />
// 									<SeanceCell deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"vendredi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="vendredi" />
// 									<SeanceCell deleteSeance={this.deleteSeance} addSeance={this.addSeance} resetCellsToChange={this.resetCellsToChange} taken_cells={this.state.taken_cells} cells_to_change={this.state.cells_to_change} id={"samedi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="samedi" />
// 								</StyledTableRow>
// 							))}
// 						</TableBody>
// 					</Table>
// 				</TableContainer>
// 				<Grid container justify="space-between">
// 					<DatePicker handleChange={this.handleDateDebutChange} label="Date de début" />
// 					<DatePicker handleChange={this.handleDateFinChange} label="Date de fin" />
// 					<Button startIcon={<Send />} color="primary" variant="contained" onClick={this.submit} style={{ height: 30, marginTop: 20, marginRight: 50 }}>
// 						Valider
// 				</Button>
// 				</Grid>

// 			</div>
// 		);
// 	}
// }
// export default Tabler;