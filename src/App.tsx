import React from 'react';
import './App.css';
import Main from "./components/Main";
import {Route, Routes} from "react-router-dom";
import MyCards from "./components/MyCards";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/my-cards" element={<MyCards/>}/>
            </Routes>
        </div>
    );
}

export default App;
