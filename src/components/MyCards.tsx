import React from 'react';
import Tab from "./Tab";
import {Col, Row, Select} from "antd";
import {FaArrowTrendDown, FaArrowTrendUp} from "react-icons/fa6";

function MyCards() {
    const [sort, setSort] = React.useState<"balance" | "up" | "down">("balance");
    const cardBgImages = [
        {img: "/img_8.png", balance: "24 351 355"},
        {img: "/img_1.png", balance: "51 351 515"},
        {img: "/img_2.png", balance: "54 351 215"},
        {img: "/img_3.png", balance: "74 651 315"},
        {img: "/img_4.png", balance: "51 351 325"},
        {img: "/img_5.png", balance: "34 321 215"},
        {img: "/img_6.png", balance: "73 121 325"},
        {img: "/img_7.png", balance: "15 681 425"},
    ]

    if (sort === "up") {
        cardBgImages.sort((a, b) => {
            return a.balance.trim().replace(/\s+/g, "").localeCompare(b.balance.trim().replace(/\s+/g, ""))
        })
    } else if (sort === "down") {
        cardBgImages.sort((a, b) => {
            return b.balance.trim().replace(/\s+/g, "").localeCompare(a.balance.trim().replace(/\s+/g, ""))
        })
    }

    const onChange = (value: string) => {
        setSort(value as "balance" | "up" | "down")
    }

    const allBalance = cardBgImages.reduce((prev, curr) => {
        return prev + parseInt(curr.balance.trim().replace(/\s+/g, ""))
    }, 0)

    return (
        <div className="px-20 py-10 min-h-[100vh]">
            <img src="/img.png" alt="logo" width={120} className={"my-3"}/>
            <Tab/>
            <div className="flex justify-start items-center my-3 gap-4">
                <div className="flex justify-start items-center gap-3">
                    <label htmlFor="sort">Sort by:</label>
                    <Select onChange={onChange} id="sort" className={"w-[150px]"}
                            options={[{
                                value: "up",
                                label: <span
                                    className={"flex justify-between items-center gap-2"}>Growth <span><FaArrowTrendUp/></span></span>
                            }, {
                                value: "down",
                                label: <span
                                    className={"flex justify-between items-center gap-2"}>Decrease <span><FaArrowTrendDown/></span></span>
                            }]}></Select>
                </div>
                <p>
                    All cards: <span className={"text-lg font-semibold"}>{cardBgImages.length}</span>
                </p>
                <p>
                    Your balance: <span className={"text-lg font-semibold"}>{allBalance.toLocaleString()}</span>
                </p>
            </div>
            <Row>
                {cardBgImages.map(img => (
                    <Col xs={24} sm={24} md={12} lg={8}>
                        <div className="p-2 relative" style={{
                            height: "100%"
                        }}>
                            <img src={img.img} alt="card" className={"h-[100%] w-[100%]"} style={{
                                backgroundSize: "cover",
                            }}/>
                            <span
                                className={"absolute top-10 text-white sm:text-md lg:text-2xl font-semibold left-1/2 -translate-x-1/2"}>{img.balance}</span>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default MyCards;