import DatePicker from 'react-datepicker';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import translations from './../../../../res/translations/booking'
import './style.css';
import {Icon} from 'semantic-ui-react'

function RangeDatePicker() {

    const [date, setDate] = React.useState({from: null, to: null});

    const calendarRef = React.createRef();

    const handleFromSelect = (e) => {
        setDate({...date, from: e});
        calendarRef.current.setOpen(true);
    };


    return <div style={style.container} className={"parent-date-picker"}>
        <DatePicker
            className={"date-input-field"}
            minDate={new Date()}
            selected={date.from}
            dateFormat="DD-MM-YYYY"
            startDate={new Date()}
            onChange={handleFromSelect}
            placeholderText={translations.view.panel.from}
            isClearable={true}
            locale={"ru"}/>

        <div style={style.arrow}>
            <Icon name='arrow right' size='large'/>
        </div>

        <DatePicker
            className={"date-input-field"}
            minDate={new Date()}
            ref={calendarRef}
            selected={date.to}
            dateFormat="DD-MM-YYYY"
            startDate={date.from}
            onChange={(e) => setDate({...date, to: e})}
            placeholderText={translations.view.panel.to}
            isClearable={true}
            locale={"ru"}/>

    </div>;
}

const style = {
    container: {
        display: "flex",
        flexGrow: 1
    },
    arrow: {
        padding: "5px",
        color: "#8c8c8c"
    }
};

export default (RangeDatePicker);
