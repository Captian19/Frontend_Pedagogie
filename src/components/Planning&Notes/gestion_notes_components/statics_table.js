import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



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

const tableuseStyles = makeStyles({
    table: {
        minWidth: 200,
        maxWidth:350,
    },
});


export default function StaticsTable(props) {
    const classes = tableuseStyles();
    const statics = props.statics;
    const keys = Object.keys(statics.maxnote);
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Examen</StyledTableCell>
                        <StyledTableCell align="right">Note minimale</StyledTableCell>
                        {/* <StyledTableCell align="right">Note moyenne</StyledTableCell> */}
                        <StyledTableCell align="right">Note maximale</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {keys.map((key, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                                { (key.charAt(0).toUpperCase() + key.slice(1)).replace("_", " ")}
                            </StyledTableCell>
                            <StyledTableCell align="right">{statics.minnote[key]}</StyledTableCell>
                            {/* <StyledTableCell align="right">{statics.mean[key]}</StyledTableCell> */}
                            <StyledTableCell align="right">{statics.maxnote[key]}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
