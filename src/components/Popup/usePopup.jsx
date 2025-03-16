import { useState } from 'react';

const usePopup = () => {
    const [popup, setPopup] = useState({ message: '', type: '' });

    const showPopup = (message, type = 'info') => {
        setPopup({ message, type });
    };

    const closePopup = () => {
        setPopup({ message: '', type: '' });
    };

    return { popup, showPopup, closePopup };
};

export default usePopup;
