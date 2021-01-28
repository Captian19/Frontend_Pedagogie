import React, {Component} from "react";

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

function RadioButtons() {
    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div>
            <Radio
                checked={selectedValue === 'a'}
                onChange={handleChange}
                value="a"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'A' }}
            />
            <Radio
                checked={selectedValue === 'b'}
                onChange={handleChange}
                value="b"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'B' }}
            />
            <GreenRadio
                checked={selectedValue === 'c'}
                onChange={handleChange}
                value="c"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'C' }}
            />
            <Radio
                checked={selectedValue === 'd'}
                onChange={handleChange}
                value="d"
                color="default"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'D' }}
            />
            <Radio
                checked={selectedValue === 'e'}
                onChange={handleChange}
                value="e"
                color="default"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'E' }}
                size="small"
            />
        </div>
    );
}


const Formulaire_Calendrier = (props) => {
    const [selectedValue, setSelectedValue] = React.useState(props.etat_session);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const alertSuccessUpdate = () => {
        if (props.isupdated){
            return (<div className="alert alert-success" id="success-alert" role="alert">
                calendrier mis à jour!
            </div>)
        }
    }
    const alertSuccessCreate = () => {
        if (props.iscreated === true && props.isupdated === false){
            return (<div className="alert alert-success" id="success-alert" role="alert">
                le calendrier à été crée avec succès! (Mettre à jour)
            </div>)
        }
        else {
            return (<div className="alert alert-info" id="success-alert" role="alert">
                Concours EPT:
            </div>)
        }
    }

    return (
        <>
            <main className="c-main">
                <form className="form-horizontal" onSubmit={props.handleSubmitCal}>
                    <div className="form-group">
                        <div className="controls">
                            <div className="row">
                                {alertSuccessCreate()}
                                {alertSuccessUpdate()}
                            </div>
                            <div className="row">
                                <div className="col col-md-6">
                                    <label className="col-form-label" for="prependedInput">Date de Debut</label>
                                    <input
                                        type="date"
                                        name="start"
                                        className="form-control"
                                        onChange={props.handleChangeCal}
                                        required
                                    />
                                </div>
                                <div className="col col-md-6">
                                    <label className="col-form-label" for="prependedInput">Date de Fin</label>
                                    <input
                                        type="date"
                                        name="end"
                                        className="form-control"
                                        onChange={props.handleChangeCal}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button type="submit" variant="contained" color="default"> Valider </Button>
                </form>

            </main>
        </>
    );

}

export default Formulaire_Calendrier;