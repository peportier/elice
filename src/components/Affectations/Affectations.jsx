import React, {Component} from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {CSVExport, Search} from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import cellEditFactory from 'react-bootstrap-table2-editor';

import "./affectations.css"
import Form from "react-bootstrap/Form";

const {SearchBar} = Search;
const {ExportCSVButton} = CSVExport;

class Affectations extends Component {
    render() {
        return (
            <div>
                <h2>4. Affectations</h2>

                <Form inline className="mb-2" id="seed">
                    <Form.Label>Graine&nbsp;:&nbsp;</Form.Label>
                    <Form.Control size="sm" type="text" name="seed" onChange={this.props.changeSeed} value={this.props.seed}/>
                    <Button variant="primary" size="sm" name="random_seed" onClick={this.props.changeSeed}>&#8635;</Button>
                </Form>

                <ToolkitProvider
                    keyField='id'
                    data={this.props.students}
                    columns={this.props.rtColumns}
                    search
                    exportCSV
                >

                    {
                        props => (
                            <div>
                                <SearchBar placeholder="Recherche..." {...props.searchProps} />
                                <div className="float-right">
                                    {this.props.isAffecting && <Spinner as="span"
                                                                        className="mr-2"
                                                                        animation="border"
                                                                        size="sm"
                                                                        role="status"
                                                                        aria-hidden="true"/>}
                                    <Button className="btn-primary mr-2"
                                            onClick={() => this.props.affect(false)}
                                            disabled={this.props.isAffecting || this.props.students.length === 0}>
                                        Ventiler sans attraits
                                    </Button>
                                    <Button className="btn-primary mr-2"
                                            onClick={() => this.props.affect(true)}
                                            disabled={this.props.isAffecting || this.props.students.length === 0}>
                                        Ventiler avec attraits
                                    </Button>
                                    <ExportCSVButton className="btn-primary"
                                                     disabled={this.props.isAffecting || this.props.students.length === 0}
                                                     {...props.csvProps}>Exporter en CSV</ExportCSVButton>
                                </div>
                                <hr/>
                                <BootstrapTable
                                    bootstrap4
                                    classes="table-sm"
                                    wrapperClasses="table-responsive"
                                    striped
                                    hover
                                    condensed
                                    noDataIndication="Pas de données"
                                    pagination={paginationFactory({sizePerPage: 10, hideSizePerPage: false})}
                                    cellEdit={cellEditFactory({
                                        mode: 'click',
                                        blurToSave: true,
                                        afterSaveCell: (oldValue, newValue, row, column) => { this.props.editRow(row); }
                                    })}
                                    {...props.baseProps}
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        );
    }
}

export default Affectations;
