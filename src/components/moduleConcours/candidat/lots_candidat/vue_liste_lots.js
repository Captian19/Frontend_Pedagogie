import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import {
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
    TableGroupRow,
    GroupingPanel,
    DragDropProvider,
    Toolbar,
    SearchPanel,
    PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';

import {connect} from "react-redux"
import {get_NotesByYear} from "../../../../actions/moduleConcours/action_NoteConcours";



const Vue_Lots_Candidat = (props) => {

    const [columns] = useState([
        { name: 'nom', title: 'Nom' },
        { name: 'prenom', title: 'Prenom' },
        { name: 'id_lot', title: 'Lot' },
        { name: 'note_maths', title: 'Mathematiques' },
        { name: 'note_physique', title: 'Physique' },
        { name: 'note_francais', title: 'Francais' },
        { name: 'note_anglais', title: 'Anglais' },
        { name: 'moy_concours', title: 'Moyenne'},
        { name: 'anonymat_candidat', title: 'Anonymat'}
    ]);
    const [rows, setRows] = useState(props.state.liste_Candidats);
    const [searchValue, setSearchState] = useState('');
    const [sorting, setSorting] = useState([{ columnName: 'moy_concours', direction: 'desc' }]);
    const [pageSizes] = useState([5, 10, 15, 30, 50, 0]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [grouping] = useState([{ columnName: 'id_lot' }]);
    const [groupingStateColumnExtensions] = useState([
        { columnName: 'nom', groupingEnabled: false },
        { columnName: 'prenom', groupingEnabled: false },
        { columnName: 'id_lot', groupingEnabled: false },
    ]);

    const getData = (year) => {
        props.get_NotesByYear(year).then(res => {
            setRows(res.data.results);
        })
    }

    useEffect(() => {
        getData(window.location.href.split('/')[window.location.href.split('/').length - 1])
    },[])

    return (
        <Paper>
            <Grid
                rows={rows}
                columns={columns}
            >
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
                <TableHeaderRow showGroupingControls showSortingControls />
                <TableGroupRow />
                <Toolbar />
                <PagingPanel
                    pageSizes={pageSizes}
                />
                <SearchPanel />
                <GroupingPanel showGroupingControls />
            </Grid>
        </Paper>
    );

}

const mapStateToProps = state => ({
    token: state.auth.token
})

export default connect(mapStateToProps, {get_NotesByYear})(Vue_Lots_Candidat)