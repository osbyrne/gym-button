import React, { useEffect } from 'react';

const App = () => {
    useEffect(() => {
        let deferredPrompt;

        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later
            deferredPrompt = e;
            console.log('App can be installed');
        });
    }, []);

    return (
        <div>
            <h1>Hello World</h1>
        </div>
    );
};

export default App; 