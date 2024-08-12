import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import TabContextProvider from "./contexts/TabContext";
import ImagesContext from "./contexts/ImagesContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ImagesContext>
                <TabContextProvider>
                    <App/>
                </TabContextProvider>
            </ImagesContext>
        </BrowserRouter>
    </React.StrictMode>
);