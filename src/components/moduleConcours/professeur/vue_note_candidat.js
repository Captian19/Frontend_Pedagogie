import React, { useState, useEffect } from 'react';

import Paper from '@material-ui/core/Paper';
import {
  SelectionState,
  PagingState,
  IntegratedPaging,
  FilteringState,
  IntegratedFiltering,
  SortingState,
  IntegratedSorting,
  EditingState,
} from '@devexpress/dx-react-grid';

import { PagingPanel, TableEditColumn, } from '@devexpress/dx-react-grid-material-ui';

import { Plugin, Template, TemplateConnector, TemplatePlaceholder, } from '@devexpress/dx-react-core';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Label, FormGroup, Input, } from 'reactstrap';

import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  TableSelection,
} from '@devexpress/dx-react-grid-bootstrap4';

import {
  CCardHeader,
} from '@coreui/react';

import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import {connect} from "react-redux";
import {get_NotesByYear, delete_Note} from "../../../actions/moduleConcours/action_NoteConcours";

  

function FieldGroup({ id, label, ...props }) {
    return (
      <FormGroup>
        <Label>{label}</Label>
        <Input {...props} />
      </FormGroup>
    );
  }
  
  const Popup = ({
    row,
    onChange,
    onApplyChanges,
    onCancelChanges,
    open,
  }) => (
    <Modal isOpen={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title">
      <ModalHeader id="form-dialog-title">
        Employee Details
      </ModalHeader>
      <ModalBody>
        <Container>
          <Row>
            <Col sm={6} className="px-2">
              <FieldGroup
                name="id_lot"
                label="id lot"
                value={row.id_lot}
                onChange={onChange}
              />
            </Col>
            <Col sm={6} className="px-2">
              <FieldGroup
                name="anonymat_candidat"
                label="Anonymat Candidat"
                value={row.anonymat_candidat}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={6} className="px-2">
              <FieldGroup
                name="note_maths"
                label="Mathematique"
                value={row.note_maths}
                onChange={onChange}
              />
            </Col>
            <Col sm={6} className="px-2">
              <FieldGroup
                type="text"
                name="note_physique"
                label="Physique"
                value={row.note_physique}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={6} className="px-2">
              <FieldGroup
                name="note_francais"
                label="Francais"
                value={row.note_francais}
                onChange={onChange}
              />
            </Col>
            <Col sm={6} className="px-2">
              <FieldGroup
                name="note_anglais"
                label="Anglais"
                value={row.note_anglais}
                onChange={onChange}
              />
            </Col>
          </Row>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onCancelChanges} color="secondary">
          Quitter
        </Button>
        {' '}
        <Button onClick={onApplyChanges} color="primary">
          Rectifier
        </Button>
      </ModalFooter>
    </Modal>
  );
  
  const PopupEditing = React.memo(({ popupComponent: Popup }) => (
    <Plugin>
      <Template name="popupEditing">
        <TemplateConnector>
          {(
            {
              rows,
              getRowId,
              addedRows,
              editingRowIds,
              createRowChange,
              rowChanges,
            },
            {
              changeRow, changeAddedRow, commitChangedRows, commitAddedRows,
              stopEditRows, cancelAddedRows, cancelChangedRows,
            },
          ) => {
            const isNew = addedRows.length > 0;
            let editedRow;
            let rowId;
            if (isNew) {
              rowId = 0;
              editedRow = addedRows[rowId];
            } else {
              [rowId] = editingRowIds;
              const targetRow = rows.filter(row => getRowId(row) === rowId)[0];
              editedRow = { ...targetRow, ...rowChanges[rowId] };
            }
  
            const processValueChange = ({ target: { name, value } }) => {
              const changeArgs = {
                rowId,
                change: createRowChange(editedRow, value, name),
              };
              if (isNew) {
                changeAddedRow(changeArgs);
              } else {
                changeRow(changeArgs);
              }
            };
            const rowIds = isNew ? [0] : editingRowIds;
            const applyChanges = () => {
              if (isNew) {
                commitAddedRows({ rowIds });
              } else {
                stopEditRows({ rowIds });
                commitChangedRows({ rowIds });
              }
            };
            const cancelChanges = () => {
              if (isNew) {
                cancelAddedRows({ rowIds });
              } else {
                stopEditRows({ rowIds });
                cancelChangedRows({ rowIds });
              }
            };
  
            const open = editingRowIds.length > 0 || isNew;
            return (
              <Popup
                open={open}
                row={editedRow}
                onChange={processValueChange}
                onApplyChanges={applyChanges}
                onCancelChanges={cancelChanges}
              />
            );
          }}
        </TemplateConnector>
      </Template>
      <Template name="root">
        <TemplatePlaceholder />
        <TemplatePlaceholder name="popupEditing" />
      </Template>
    </Plugin>
  ));
  
const getRowId = row => row.id;


function Vue_Note_Candidat(props) {

    const [columns] = useState([
        { name: 'id_lot', header: 'id du lot', defaultWidth: 100, resizable: false,},
        { name: 'anonymat_candidat', header: 'anonymat du candidat', defaultWidth: 80, resizable: false,},
        { name: 'note_maths', header: 'Mathematiques'},
        { name: 'note_physique', header: 'Physiques'},
        { name: 'note_francais', header: 'Francais'},
        { name: 'note_anglais', header: 'Anglais'},
      ]);

    const [rows, setRows] = useState(props.availableNotes);

    const [selection, setSelection] = useState([]);

    const styles = {
        banking: {
          backgroundColor: '#f5f5f5',
        },
        health: {
          backgroundColor: '#a2e2a4',
        },
        telecom: {
          backgroundColor: '#b3e5fc',
        },
        energy: {
          backgroundColor: '#ffcdd2',
        },
        insurance: {
          backgroundColor: '#f0f4c3',
        },
    };

    const TableComponent = ({ ...restProps }) => (
        <Table.Table
          {...restProps}
          className="table-striped"
        />
    );

    const TableRow = ({ row, ...restProps }) => (
        <Table.Row
          {...restProps}
          // eslint-disable-next-line no-alert
          onClick={() => alert(JSON.stringify(row))}
          style={{
            cursor: 'pointer',
            ...styles[row.sector],
          }}
        />
    );

      const commitChanges = ({ added, changed, deleted }) => {
        let changedRows;
        if (changed) {
          changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        if (deleted) {
          const deletedSet = new Set(deleted);
          props.delete_Note(rows.filter(row => !deletedSet.has(row.id))[0].id);
          changedRows = rows.filter(row => !deletedSet.has(row.id));
        }
        setRows(changedRows);
      };

    const [currentPage, setCurrentPage] = useState(0);
    const [pageSizes] = useState([5, 10, 15, 0]);
    const [pageSize, setPageSize] = useState(5);

    // si on recharge la page
    useEffect(() => {
        props.get_NotesByYear(new Date().getFullYear())
            .then(res => {
                console.log(res.data.results.map(note => note.correcteur.id_correcteur))
                setRows(res.data.results.filter(note => note.correcteur.id_correcteur === ("" + props.user.id)))
            })
            .catch(err => console.log(err));
    }, [])

  
    return (
        <div>
          <CCardHeader>
          <span>
            Note selectionnés:
            {' '}
            {selection.length}
          </span>
          </CCardHeader>
          <div>
          <Paper>
            <Grid rows={rows} columns={columns} getRowId={getRowId}>
                <PagingState
                currentPage={currentPage}
                onCurrentPageChange={setCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
                />
                 <SelectionState selection={selection}  onSelectionChange={setSelection}  />
                 <EditingState onCommitChanges={commitChanges} />
                 <FilteringState defaultFilters={[]} />
                 <IntegratedFiltering />
                 <SortingState defaultSorting={[{ columnName: 'note_maths', direction: 'desc' }]} />
                 <IntegratedSorting />
                 <Table tableComponent={TableComponent} rowComponent={TableRow} />
                 <TableHeaderRow showSortingControls /> 
                 <TableSelection selectByRowClick highlightRow showSelectionColumn={false} />
                 <TableFilterRow />
                 <TableEditColumn showDeleteCommand />
                 <PopupEditing popupComponent={Popup} />
                 <IntegratedPaging />
                 <PagingPanel pageSizes={pageSizes} />
            </Grid>
          </Paper>
          </div>
        </div>
      );
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.auth.user,
});
export default connect(mapStateToProps, {get_NotesByYear, delete_Note})(Vue_Note_Candidat);
