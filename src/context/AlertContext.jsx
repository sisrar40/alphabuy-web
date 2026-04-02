import React, { createContext, useContext, useState, useCallback } from 'react';
import CustomAlert from '../components/ui/CustomAlert';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ show: false, message: '', type: 'info' });

    const showAlert = useCallback((message, type = 'info') => {
        setAlert({ show: true, message, type });
        setTimeout(() => {
            setAlert({ show: false, message: '', type: 'info' });
        }, 5000);
    }, []);

    const hideAlert = useCallback(() => {
        setAlert({ show: false, message: '', type: 'info' });
    }, []);

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            {alert.show && (
                <CustomAlert
                    message={alert.message}
                    type={alert.type}
                    onClose={hideAlert}
                />
            )}
        </AlertContext.Provider>
    );
};
