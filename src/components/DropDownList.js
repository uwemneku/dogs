
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

/**
 * @param {object} props
 * @param {Array} list          An array containing a the items to display in the list
 * @param {String} id           The id to be used in the form control element 
 * @param {String} Name         This is displayed when no selection have been made 
 * @param {Function} onSelect   This callback function is called when a selection is made with the selected value as  the argumnet
 */
function DropDownList({ list, id, name, onSelect }) {
    const classes = useStyles();
    const [selection, setSelection] = useState("");

    const handleChange = (event) => {
        setSelection(event.target.value);
        onSelect(event.target.value)
      };
    
    return (
        <div>
            {
                list.length > 0 &&
                <FormControl className={classes.formControl} >
                    <InputLabel id={id}>{name}</InputLabel>
                    <Select
                        labelId={id}
                        id={id}
                        value={selection}
                        onChange={handleChange}
                    >
                        {list.map(x =>
                            <MenuItem key={x} value={x}>{x}</MenuItem>
                        )}

                    </Select>
                </FormControl>
            }
        </div>
    );



}
export default React.memo(DropDownList);
