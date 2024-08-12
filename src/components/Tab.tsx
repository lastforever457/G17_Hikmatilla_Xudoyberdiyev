import React, {useContext} from 'react';
import {Col, Row} from "antd";
import {Link} from "react-router-dom";
import {FaRegCreditCard} from "react-icons/fa";
import {TabContext} from "../contexts/TabContext";


function Tab() {
    const {card, setCard} = useContext(TabContext);
    return (
        <>
            <Row>
                <Col xs={24} sm={24} md={24} lg={12}>
                    <Link to={"/"}>
                        <div onClick={() => {
                            setCard(true)
                            localStorage.setItem("page", "true")
                        }}
                             className={`cursor-pointer text-black hover:text-black flex flex-col justify-around min-h-[100px] my-2 lg:me-1.5 px-5 py-4 rounded-2xl border-2 ${card ? "bg-violet-200 border-violet-500" : "bg-gray-100 border-gray-300"}`}>
                            <FaRegCreditCard className="text-3xl"/>
                            <p className={"text-lg"}>New Credit Card</p>
                        </div>
                    </Link>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12}>
                    <Link to={"/my-cards"}>
                        <div onClick={() => {
                            setCard(false)
                            localStorage.setItem("page", "false")
                        }}
                             className={`cursor-pointer text-black hover:text-black flex flex-col justify-around min-h-[100px] my-2 lg:ms-1.5 px-5 py-4 rounded-2xl border-2 ${!card ? "bg-violet-200 border-violet-500" : "bg-gray-100 border-gray-300"}`}>
                            <FaRegCreditCard className="text-3xl"/>
                            <p className={"text-lg"}>My Cards</p>
                        </div>
                    </Link>
                </Col>
            </Row>
        </>
    );
}

export default Tab;