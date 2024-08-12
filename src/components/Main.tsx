import React, {useState} from 'react';
import {Button, Col, Form, FormInstance, Input, Modal, Row, Select, Space} from "antd";
import Tab from "./Tab";
import SelectCardBg from "./SelectCardBg";
import axios from "axios";
import {toastError, toastSuccess} from "./Toastify";
import {useNavigate} from "react-router-dom";

interface SubmitButtonProps {
    form: FormInstance;
}

export interface ICard {
    id: number;
    user: string;
    cardNumber: number;
    cardDate: string;
    cardRegion: string;
    cardBg: string;
    cardType: string;
    cardBalance: number
}

function Main({openModal, setOpenModal}: {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [form] = Form.useForm();
    const [open, setOpen] = React.useState(false);
    const [choosenImage, setChoosenImage] = React.useState<string>("");
    const navigate = useNavigate();

    const generateRandomNumber = () => {
        return Math.floor(Math.random() * 90000000) + 10000000;
    };

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
            user: values.user || "",
            cardNumber: values.cardNumber || "",
            cardDate: values.cardDate || "",
            cardRegion: values.cardRegion || "",
            cardType: checkCardType(values.cardType),
            cardBg: choosenImage || "",
            cardBalance: generateRandomNumber()
        }
        try {
            await axios.post("https://7cbebd0024c779a5.mokky.dev/creditCards", data)
            toastSuccess("Card added successfully")
            setTimeout(() => {
                navigate("/my-cards")
            }, 1000)
        } catch (e) {
            console.log(e)
            toastError("Error adding card")
        }
    };

    const showDrawer = () => {
        setOpen(true);
    };

    return (
        <div className={"w-[100%] min-h-[100vh]"}>
            <Row>
                <Col xs={24} sm={24} md={24} lg={12}>
                    <div className="px-20 py-10 min-h-[100vh]">
                        <img src="/img.png" alt="logo" width={120}/>
                        <div className="cards my-5">
                            <Tab/>
                        </div>
                        <p className={"text-3xl font-semibold text-start"}>Add new card</p>
                        <p className={"text-start my-2"}>Do more with unlimited blocks, files, automations &
                            integrations.</p>
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
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12}>
                    <div className="w-[100%] min-h-[100vh] main-right"></div>
                </Col>
            </Row>
            <SelectCardBg open={open} setOpen={setOpen} choosenImage={choosenImage} setChoosenImage={setChoosenImage}/>
        </div>
    );
}

export const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({form, children}) => {
    const [submittable, setSubmittable] = React.useState<boolean>(false);

    // Watch all values
    const values = Form.useWatch([], form);

    React.useEffect(() => {
        form
            .validateFields({validateOnly: true})
            .then(() => setSubmittable(true))
            .catch(() => setSubmittable(false));
    }, [form, values]);

    return (
        <Button type="primary" htmlType="submit" disabled={!submittable}>
            {children}
        </Button>
    );
};

export default Main;