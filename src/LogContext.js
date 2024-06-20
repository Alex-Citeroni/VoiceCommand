import React, { createContext, useState, useEffect } from 'react';

export const LogContext = createContext();

export const LogProvider = ({ children }) => {
    const [isRPressed, setIsRPressed] = useState(false);
    const [logs, setLogs] = useState(() => {
        const savedLogs = localStorage.getItem('logs');
        return savedLogs ? JSON.parse(savedLogs) : [];
    });

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'logs') {
                setLogs(event.newValue ? JSON.parse(event.newValue) : []);
            } else if (event.key === 'isRPressed') {
                setIsRPressed(event.newValue === 'true');
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('logs', JSON.stringify(logs));
    }, [logs]);

    useEffect(() => {
        localStorage.setItem('isRPressed', isRPressed);
    }, [isRPressed]);

    return (
        <LogContext.Provider value={{ isRPressed, setIsRPressed, logs, setLogs }}>
            {children}
        </LogContext.Provider>
    );
};
