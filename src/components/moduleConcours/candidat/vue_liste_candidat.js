import React, { useState } from 'react';
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

import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import all from "../../../constants/moduleConcours/someConstants";



import {
  CCardHeader,
} from '@coreui/react';


// Validation
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';



function FieldGroup({ id, label, ...props }) {
    return (
      <FormGroup>
        <Label>{label}</Label>
        <Input {...props} />
      </FormGroup>
    );
  }

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function SelectGroup({ id, label, ...props }) {
    return (
        <FormGroup>
            <Label>{}</Label>
            <Input type="select"
                   name={props.name}
                   id="exampleSelect"
                   value={getKeyByValue(props.valeurs, props.defaultValue)}
                   onChange={props.onChange}>
                {Object.keys(props.valeurs).map((key) => (
                    <option value={key}>{props.valeurs[key]}</option>
                ))}
            </Input>
        </FormGroup>
    )
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
        Editer un candidat
      </ModalHeader>
      <ModalBody>
        <Container>
          <Row>
            <Col sm={6} className="px-2">
              <FieldGroup
                name="prenom"
                label="Prenom"
                value={row.prenom}
                onChange={onChange}
              />
            </Col>
            <Col sm={6} className="px-2">
              <FieldGroup
                name="nom"
                label="Nom"
                value={row.nom}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row>
              <Col sm={6} className="px-2">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Valider Paiement</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={<Switch onChange={onChange} name="gilad" />}
                        label="is_admis"
                      />
                      </FormGroup>
                </FormControl>
              </Col>
              <Col sm={6} className="px-2">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Valider Information</FormLabel>
                    <FormGroup>
                    <FormControlLabel
                      control={<Switch onChange={onChange} name="gilad" />}
                      label="has_confirmed"
                    />
                    </FormGroup>
                </FormControl>
                </Col>
            </Row>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onCancelChanges} variant="contained" color="danger">
          Cancel
        </Button>
        {' '}
        <Button onClick={onApplyChanges} variant="contained" color="success">
          Save
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
  
const getRowId = row => row.id;
// { name: 'date naissance', header: 'date naissance', render: ({ value }) =>
//     <span style={{ color: value < 30 ? 'lightgreen' : 'inherit'}}>{value}</span>
// },

function Vue_Liste_Candidat(props) {
    const {candidatSessions} = props.candidatSessions;

    const [columns] = useState([
        { name: 'prenom', header: 'Prénom', defaultWidth: 100, resizable: false,},
        { name: 'nom', header: 'Nom', defaultWidth: 80, resizable: false,},
        { name: 'date_naissance', header: 'date naissance'},
        { name: 'lieu_naissance', header: 'lieu naissance'},
        { name: 'pays', header: 'pays', render: ({ value }) =>
     <span>{value}</span>},
        { name: 'telephone', header: 'telephone'},
        { name: 'lycee', header: 'Etablissement'},
        { name: 'nom_centre', header: 'centre'},
        { name: 'serie', header: 'serie'},
        { name: 'filieres', header: 'filieres'},
        { name: 'type_candidat', header: 'type de candidat'},
        { name: 'moy_gen_seconde', header: 'moyenne 2nde'},
        { name: 'moy_gen_premiere', header: 'moyenne 1re'},
        { name: 'moy_gen_terminale', header: 'moyenne Tle'},
        { name: 'moy_gen_secondaire', header: 'moyenne lycee'},
        { name: 'moy_gen_bac', header: 'moyenne bac'},
        { name: 'moy_concours', header: 'moyenne concours'},
        { name: 'moyenne_ponderee', header: 'moyenne ponderée'},
      ]);

    const [rows, setRows] = useState(props.candidatSessions);

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

      const commitChanges = ({changed, deleted }) => {
        let changedRows;
        if (changed) {
            let row_id = Object.keys(changed)[0];
          changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
          let old_element = props.candidatSessions.find(candidat => candidat.id = row_id);
          let new_element = { ...old_element, ...Object.values(changed)[0]}
          let new_element_reformated = {...new_element,
                                        type_candidat: getKeyByValue(all.TYPE, new_element.type_candidat),
                                        pays: getKeyByValue(all.NATIONALITE, new_element.pays),
                                        serie: getKeyByValue(all.SERIE, new_element.serie),
                                        mention: getKeyByValue(all.MENTION, new_element.mention)
          }
          props.edit_CandidatSession(row_id, new_element_reformated);
        }
        if (deleted) {
          const deletedSet = new Set(deleted);
          let row_id = [...deleted][0];
          changedRows = rows.filter(row => !deletedSet.has(row.id));
          props.delete_CandidatSession(row_id);
        }
        setRows(changedRows);
      };

    const [currentPage, setCurrentPage] = useState(0);
    const [pageSizes] = useState([2, 5, 10, 15, 25, 50, 0]);
    const [pageSize, setPageSize] = useState(5);
    

  
    return (
        <div>
          <CCardHeader>
          <span>
            Nombre de candidats selectionnés:
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
                 <SortingState defaultSorting={[{ columnName: 'prenom', direction: 'asc' }]} />
                 <IntegratedSorting />
                 <Table tableComponent={TableComponent} rowComponent={TableRow} />
                 <TableHeaderRow showSortingControls /> 
                 <TableSelection selectByRowClick highlightRow showSelectionColumn={false} />
                 <TableFilterRow />
                 <TableEditColumn showEditCommand showDeleteCommand />
                 <PopupEditing popupComponent={Popup} /> 
                 <IntegratedPaging />
                 <PagingPanel pageSizes={pageSizes} />
            </Grid>
          </Paper>
          </div>
        </div>
      );
}

export default Vue_Liste_Candidat;
