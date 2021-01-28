import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import {
    EditingState,
    GroupingState,
    SearchState,
    IntegratedFiltering,
    IntegratedGrouping,
    SortingState,
    IntegratedSorting,
    PagingState,
    IntegratedPaging,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
    GroupingPanel,
    DragDropProvider,
    Toolbar,
    SearchPanel,
    PagingPanel, TableGroupRow,
} from '@devexpress/dx-react-grid-material-ui';


// import {
//     generateRows,
//     defaultColumnValues,
// } from '../../../demo-data/generator';

const getRowId = row => row.id;

const Liste_Candidat = (props) => {
    const [columns] = useState([
        { name: 'prenom', title: 'Prenom' },
        { name: 'nom', title: 'Nom' },
        { name: 'date_naissance', title: 'Date de naissance' },
        { name: 'lieu_naissance', title: 'Lieu de naissance' },
        { name: 'pays', title: 'Pays' },
        { name: 'telephone', title: 'Telephone' },
        { name: 'lycee', title: 'Lycee' },
        { name: 'nom_centre', title: 'Centre' },
        { name: 'serie', title: 'Serie' },
        { name: 'filieres', title: 'Filieres' },
        { name: 'type_candidat', title: 'Type' },
        { name: 'moy_gen_seconde', title: 'Seconde' },
        { name: 'moy_gen_premiere', title: 'Premiere' },
        { name: 'moy_gen_terminale', title: 'Terminale' },
        { name: 'moy_gen_secondaire', title: 'MG-Secondaire' },
        { name: 'moy_gen_bac', title: 'Bac' },
        { name: 'moy_concours', title: 'Concours' },
        { name: 'moyenne_ponderee', title: 'Moyenne Pondérée' },
    ]);
    const [rows, setRows] = useState(props.candidatSessions);
    const [searchValue, setSearchState] = useState('');
    const [sorting, setSorting] = useState([{ columnName: 'moyenne_ponderee', direction: 'desc' }]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageSizes] = useState([5, 10, 15]);
    const [grouping] = useState([{ columnName: 'lycee' }]);
    const [groupingStateColumnExtensions] = useState([
        { columnName: 'nom', groupingEnabled: false },
        { columnName: 'prenom', groupingEnabled: false },
    ]);
    const commitChanges = ({ changed, deleted }) => {
        let changedRows;

        if (changed) {
            changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
            console.log(changedRows[0])
            // 'pays',
            //     'mention',
            //     'serie',
            //     'lycee',
            //     'nom_centre',
            //     'anonymat_candidat',
            //     'id_lot',
            //     'telephone',
            //     'session',
            //     'annee_obtention_bac',
            //     'is_in_first_list',
            //     'is_in_second_list',
            //     'is_admis',
            //     'type_candidat')
            let changing_row = {...changedRows[0]}
            delete changing_row.pays;
            delete changing_row.mention;
            delete changing_row.lycee;
            delete changing_row.serie;
            delete changing_row.nom_centre;
            delete changing_row.anonymat_candidat;
            delete changing_row.id_lot;
            delete changing_row.telephone;
            delete changing_row.session;
            delete changing_row.annee_obtention_bac;
            delete changing_row.is_in_second_list;
            delete changing_row.is_in_first_list;
            delete changing_row.is_admis;
            delete changing_row.type_candidat;
            props.edit_CandidatSession(changing_row.id, changing_row).catch(error => console.log(error))
        }
        if (deleted) {
            const deletedSet = new Set(deleted);
            changedRows = rows.filter(row => !deletedSet.has(row.id));
            props.delete_CandidatSession(changedRows[0].id).catch(error => console.log(error))
        }
        setRows(changedRows);
    };

    useEffect(() => {
        props.get_CandidatSessionBySession(new Date().getFullYear())
            .then(res => setRows(res.data.results))
            .catch(e => console.log(e))
    }, [])

    return (
        <Paper>
            <Grid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
            >
                <EditingState
                    onCommitChanges={commitChanges}
                />
                <DragDropProvider />
                <PagingState
                    currentPage={currentPage}
                    onCurrentPageChange={setCurrentPage}
                    pageSize={pageSize}
                    onPageSizeChange={setPageSize}
                />
                <IntegratedPaging />
                <SortingState
                    sorting={sorting}
                    onSortingChange={setSorting}
                />
                <IntegratedSorting />
                <SearchState value={searchValue} onValueChange={setSearchState}/>
                <IntegratedFiltering />
                <GroupingState
                    defaultGrouping={grouping}
                    columnExtensions={groupingStateColumnExtensions}
                />
                <IntegratedGrouping />
                <Table />
                <TableHeaderRow />
                <TableGroupRow />
                <Toolbar />
                <PagingPanel
                    pageSizes={pageSizes}
                />
                <SearchPanel />
                <GroupingPanel showGroupingControls />
                <TableEditRow />
                <TableEditColumn
                    showEditCommand
                    showDeleteCommand
                />
            </Grid>
        </Paper>
    );
};

export default Liste_Candidat;
