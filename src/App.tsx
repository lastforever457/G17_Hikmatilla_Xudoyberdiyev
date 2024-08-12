import React, {useState} from 'react';
import './App.css';
import Main from "./components/Main";
import {Route, Routes} from "react-router-dom";
import MyCards from "./components/MyCards";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main openModal={openModal} setOpenModal={setOpenModal}/>}/>
                <Route path="/my-cards" element={<MyCards openModal={openModal} setOpenModal={setOpenModal}/>}/>
            </Routes>

            <ToastContainer/>
        </div>
    );
}

export default App;
