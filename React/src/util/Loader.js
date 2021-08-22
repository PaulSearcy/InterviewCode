import React, { useEffect, useState } from 'react';

export const Loader = () => {
    const [messages, setMessages] = useState([
        'Hmmm.... loading...',
        'Talking to walls...',
        'Watching paint dry ...',
    ]);

    useEffect(() => {
        const loader = setTimeout(() => {
            const intervalMessages = [...messages];
            intervalMessages.push(intervalMessages[0]);
            intervalMessages.shift();
            setMessages(intervalMessages);
        }, 1000);
        return () => clearTimeout(loader);
    });

    return (
        <>
            <div>
                {
                    // eslint-disable-next-line react/no-array-index-key
                    messages.slice(0, 5).map((message, index) => <p key={index}>{message}</p>)
                }
            </div>
        </>
    );
};

export default Loader;
