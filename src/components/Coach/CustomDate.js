import React from 'react';

function CustomDate({ classes, label, date }) {
    const formatDate = (date) => {
        return date;
    }

    return (
        <p className={classes}>{label}: {formatDate(date)}</p>
    );
}

export default CustomDate;