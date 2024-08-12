import React, {useContext, useEffect} from 'react';
import Tab from "./Tab";
import {Button, Col, Form, Input, Modal, Row, Select, Space} from "antd";
import {FaArrowTrendDown, FaArrowTrendUp, FaTrashCan} from "react-icons/fa6";
import {ICard, SubmitButton} from "./Main";
import axios from "axios";
import {IoEye, IoEyeOff} from "react-icons/io5";
import {FaEdit} from "react-icons/fa";
import {toastError, toastSuccess} from "./Toastify";
import SelectCardBg from "./SelectCardBg";
import {ImgContext} from "../contexts/ImagesContext";

function MyCards({openModal, setOpenModal}: {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const images = useContext(ImgContext);
    const [sort, setSort] = React.useState<"balance" | "up" | "down">("balance");
    const [cards, setCards] = React.useState<ICard[]>([]);
    const [see, setSee] = React.useState<boolean>(false);

    useEffect(() => {
        const fetchCards = async () => {
            const res = await axios.get<ICard[]>("https://7cbebd0024c779a5.mokky.dev/creditCards")
            setCards(res.data)
        }

        fetchCards()
    }, []);

    if (sort === "up") {
        cards.sort((a, b) => {
            return a.cardBalance - b.cardBalance
        })
    } else if (sort === "down") {
        cards.sort((a, b) => {
            return b.cardBalance - a.cardBalance
        })
    }

    const onChange = (value: string) => {
        setSort(value as "balance" | "up" | "down")
    }

    const allBalance = cards.reduce((prev, curr) => {
        return prev + curr.cardBalance
    }, 0)


    const splitNumber = (number: number): number[] => {
        const numberStr = number.toString();
        const chunks: number[] = [];
        for (let i = 0; i < numberStr.length; i += 4) {
            chunks.push(parseInt(numberStr.slice(i, i + 4), 10));
        }
        return chunks;
    };

    const showModal = () => {
        setOpenModal(true);
    };

    const [form] = Form.useForm();
    const [open, setOpen] = React.useState(false);
    const [choosenImage, setChoosenImage] = React.useState<string>("");

    const generateRandomNumber = () => {
        return Math.floor(Math.random() * 90000000) + 10000000;
    };

    const prepareEditModal = (card: ICard) => {
        form.setFieldsValue({
            user: card.user,
            cardNumber: card.cardNumber,
            cardDate: card.cardDate,
            cardRegion: card.cardRegion,
            cardType: card.cardType,
            cardBalance: card.cardBalance
        })
    }

    const checkCardType = (string: string) => {
        if (string === "Uzcard") {
            return "/uzcard.png"
        } else if (string === "Mastercard") {
            return "/mastercard.png"
        } else if (string === "Visa") {
            return "visacard.png"
        }
    }

    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        const data = {
            user: values.user,
            cardNumber: values.cardNumber,
            cardDate: values.cardDate,
            cardRegion: values.cardRegion,
            cardType: checkCardType(values.cardType),
            cardBg: choosenImage !== "" ? choosenImage : images[0],
            cardBalance: generateRandomNumber()
        }
        const cardId = localStorage.getItem("cardId")
        try {
            await axios.patch(`https://7cbebd0024c779a5.mokky.dev/creditCards/${cardId}`, data)
            toastSuccess("Card edited successfully")
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } catch (e) {
            console.log(e)
            toastError("Error adding card")
        }
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const deleteCard = async (id: number) => {
        try {
            await axios.delete(`https://7cbebd0024c779a5.mokky.dev/creditCards/${id}`)
            toastSuccess("Card deleted successfully")
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } catch (e) {
            console.log(e)
            toastError("Error deleting card")
        }
    }

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
                    All cards: <span className={"text-lg font-semibold"}>{cards.length}</span>
                </p>
                <p>
                    Your balance: <span className={"text-lg font-semibold"}>{allBalance.toLocaleString()}</span>
                </p>
            </div>
            <Row>
                {cards.map(card => {
                    const numberChunks = splitNumber(card.cardNumber);
                    return (
                        <Col xs={24} sm={24} md={24} lg={8} key={card.id}>
                            <div className="p-1">
                                <div
                                    className="px-10 py-5 text-white relative flex flex-col justify-around rounded-3xl bg-cover bg-center"
                                    style={{
                                        height: "300px",
                                        backgroundImage: `url(${card.cardBg || ""})`,
                                    }}>
                                    <div className="flex justify-between items-end gap-3">
                                        <img src="/credit-card-chip.png" alt="chip" width={70}/>
                                        <p className={"p-0 m-0 text-2xl"}>{card.cardBalance.toLocaleString()}</p>
                                        <img src={card.cardType} alt="card-type"
                                             width={card.cardType === "/uzcard.png" ? 40 : 70}/>
                                    </div>
                                    <div className="text-xl">
                                        <div className="flex justify-center items-center gap-3">
                                            <p style={{letterSpacing: "2px"}}
                                               className={"text-3xl text-center"}>{see ? `${numberChunks[0]} ${numberChunks[1]} ${numberChunks[2]} ${numberChunks[3]}` : `**** **** **** ${numberChunks[3]}`}</p>
                                            {see
                                                ?
                                                <span className={"text-xl cursor-pointer"} onClick={() => setSee(!see)}><IoEye/></span>
                                                : <span className={"text-xl cursor-pointer"}
                                                        onClick={() => setSee(!see)}><IoEyeOff/></span>
                                            }
                                        </div>
                                        <p className={"text-xl text-center"}>{card.cardDate}</p>
                                        <p style={{letterSpacing: "1.5px"}}
                                           className={"text-xl font-semibold"}>{card.user}</p>
                                    </div>
                                    <button onClick={async () => {
                                        await deleteCard(card.id)
                                    }}
                                            className={`absolute right-14 bottom-5 text-xl`}><FaTrashCan/>
                                    </button>
                                    <button onClick={() => {
                                        showModal()
                                        localStorage.setItem("cardId", card.id.toString())
                                        prepareEditModal(card)
                                    }}
                                            className={`absolute right-5 bottom-5 text-xl`}><FaEdit/>
                                    </button>
                                </div>
                            </div>
                        </Col>
                    )
                })}
            </Row>
            <Modal
                title="Edit card"
                open={openModal}
                footer={null}
                onCancel={() => {
                    setOpenModal(false)
                }}
            >
                <Form form={form} onFinish={onFinish} name="validateOnly" layout="vertical"
                      autoComplete="off">
                    <Form.Item name="user" label="Who is" rules={[{required: true}]}>
                        <Input className={"text-lg"}/>
                    </Form.Item>
                    <Form.Item name="cardNumber" label="Payment details" rules={[{required: true}]}>
                        <Input className={"my-0.5 text-lg"} placeholder={"Card number"}/>
                    </Form.Item>
                    <Form.Item name="cardDate" rules={[{required: true}]}>
                        <Input className={"my-0.5 text-lg"} placeholder={"Expire date"}/>
                    </Form.Item>
                    <Form.Item name="cardType" rules={[{required: true}]}>
                        <Select placeholder={"Card Type"} options={[
                            {value: "Uzcard", label: <span>Uzcard</span>},
                            {value: "Mastercard", label: <span>Mastercard</span>},
                            {value: "Visa", label: <span>Visa</span>}
                        ]}/>
                    </Form.Item>
                    <Form.Item name="cardRegion" rules={[{required: true}]}>
                        <Select placeholder={"Card Region"} options={[
                            {value: "Uzbekistan", label: <span>Uzbekistan</span>},
                            {value: "England", label: <span>England</span>},
                            {value: "Russia", label: <span>Russia</span>}
                        ]}/>
                    </Form.Item>
                    <Form.Item label={"Card background"} name={"cardBg"}>
                        <Button type="primary" onClick={showDrawer}>
                            Open
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <SubmitButton form={form}>Submit</SubmitButton>
                            <Button htmlType="reset">Reset</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
            <SelectCardBg open={open} setOpen={setOpen} choosenImage={choosenImage} setChoosenImage={setChoosenImage}/>
        </div>
    );
}

export default MyCards;