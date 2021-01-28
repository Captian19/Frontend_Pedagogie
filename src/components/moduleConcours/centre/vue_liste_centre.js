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
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {add_Centre, delete_Centre, edit_Centre, get_Centres} from "../../../actions/moduleConcours/action_Centre";


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
                name="nom_centre"
                label="Nom du centre"
                value={row.nom_centre}
                onChange={onChange}
              />
            </Col>
            <Col sm={6} className="px-2">
              <FieldGroup
                name="nbre_surveillant"
                label="Nombre surveillant"
                value={row.nbre_surveillant}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={6} className="px-2">
              <FieldGroup
                name="nombre_classe"
                label="Nombre Classe"
                value={row.nombre_classe}
                onChange={onChange}
              />
            </Col>
            <Col sm={6} className="px-2">
              <FieldGroup
                type="text"
                name="region"
                label="Region"
                value={row.region}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={6} className="px-2">
              <FieldGroup
                name="departement"
                label="Departement"
                value={row.departement}
                onChange={onChange}
              />
            </Col>
          </Row>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onCancelChanges} variant="contained" color="danger">
          Quitter
        </Button>
        {' '}
        <Button onClick={onApplyChanges} variant="contained" color="success">
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
            let editedRow;
            let rowId;

              [rowId] = editingRowIds;
              const targetRow = rows.filter(row => getRowId(row) === rowId);
              editedRow = { ...targetRow[0], ...rowChanges[rowId] };

  
            const processValueChange = ({ target: { name, value } }) => {
              const changeArgs = {
                rowId,
                change: createRowChange(editedRow, value, name),
              };
              changeRow(changeArgs);
            };
            const rowIds = editingRowIds;
            const applyChanges = () => {
                stopEditRows({ rowIds });
                commitChangedRows({ rowIds });
            };
            const cancelChanges = () => {

                stopEditRows({ rowIds });
                cancelChangedRows({ rowIds });

            };
  
            const open = editingRowIds.length > 0 ;
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
  
const getRowId = row => row.nom_centre;


function Vue_Liste_Centre(props) {

    const [columns] = useState([
        { name: 'nom_centre', header: 'Nom Centre', defaultWidth: 100, resizable: false,},
        { name: 'nombre_classe', header: 'Nombre de Classe', defaultWidth: 80, resizable: false,},
        { name: 'nbre_surveillant', header: 'Nombre de Surveillant', render: ({ value }) =>
            <span style={{ color: value < 5 ? 'lightgreen' : 'inherit'}}>{value}</span>
        },
        { name: 'superviseur', header: 'Superviseur', defaultWidth: 80, resizable: false},
        { name: 'responsable', header: 'Responsable', defaultWidth: 80, resizable: false},
        { name: 'region', header: 'Region', defaultWidth: 80, resizable: false,},
        { name: 'departement', header: 'Departement', defaultWidth: 80, resizable: false,}
      ]);

    const [rows, setRows] = useState(props.centres);

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
        if (added) {
          changedRows = [
            ...rows,
            ...added.map((row) => ({
              ...row,
            })),
          ];
        }
        if (changed) {
            let row_id = Object.keys(changed)[0]
            changedRows = rows.map(row => (changed[row.nom_centre] ? { ...row, ...changed[row.nom_centre] } : row));
            let old_element = props.centres.find(centre => centre.nom_centre = row_id);
            props.edit_Centre(row_id, { ...old_element, ...Object.values(changed)[0]});
        }
        if (deleted) {
            const deletedSet = new Set(deleted);
            let row_id = [...deleted][0];
            changedRows = rows.filter(row => !deletedSet.has(row.nom_centre));
            props.delete_Centre(row_id);
        }
        setRows(changedRows);
      };

    const [currentPage, setCurrentPage] = useState(0);
    const [pageSizes] = useState([5, 10, 15, 20, 30]);
    const [pageSize, setPageSize] = useState(5);
    useEffect(() => {

    },[])

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
                 <SortingState defaultSorting={[{ columnName: 'nom_centre', direction: 'asc' }]} />
                 <IntegratedSorting />
                 <Table tableComponent={TableComponent} rowComponent={TableRow} />
                 <TableHeaderRow showSortingControls /> 
                 <TableSelection selectByRowClick highlightRow showSelectionColumn={false} />
                 <TableFilterRow />
                 <TableEditColumn showDeleteCommand />
                 {/* <TableEditColumn showEditCommand showDeleteCommand /> */}
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
    auth: state.auth
});
export default compose(
    withRouter,
    connect(mapStateToProps, {get_Centres})
)(Vue_Liste_Centre);
