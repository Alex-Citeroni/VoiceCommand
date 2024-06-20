import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogContext } from './LogContext';

function LogsPage() {
    const { isRPressed, setIsRPressed, logs, setLogs } = useContext(LogContext);

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
    }, [setLogs, setIsRPressed]);

    const clearLogs = () => {
        localStorage.removeItem('logs');
        setLogs([]);
    };

    const downloadLogs = () => {
        const element = document.createElement('a');
        const file = new Blob([logs.join('\n')], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'logs.txt';
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        document.body.removeChild(element); // Clean up
    };

    return (
        <div className={`logs-page ${isRPressed ? 'green-background' : ''}`}>
            <header className="Log-header">
                <h2>Logs</h2>
                <div className="logs-container">
                    {logs.length > 0 ? (
                        logs.map((log, index) => <p key={index}>{log}</p>)
                    ) : (
                        <p>No logs available.</p>
                    )}
                </div>
                <div className="navigation">
                    <Link to="/VoiceCommand">
                        <button>Torna alla Home</button>
                    </Link>
                </div>
                <div className="actions">
                    <button onClick={clearLogs}>Cancella i Log</button>
                    <button onClick={downloadLogs}>Scarica i Log</button>
                </div>
            </header>
        </div>
    );
}

export default LogsPage;
