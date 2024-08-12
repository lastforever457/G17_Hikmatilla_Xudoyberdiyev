import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import TabContextProvider from "./contexts/TabContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <TabContextProvider>
                <App/>
            </TabContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);