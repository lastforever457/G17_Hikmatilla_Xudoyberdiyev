import React from 'react';
import {Button, Col, Form, FormInstance, Input, Row, Select, Space} from "antd";
import Tab from "./Tab";

interface SubmitButtonProps {
    form: FormInstance;
}

function Main() {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
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
                        <Form form={form} onFinish={onFinish} name="validateOnly" layout="vertical" autoComplete="off">
                            <Form.Item name="user" label="Who is" rules={[{required: true}]}>
                                <Input className={"text-lg"}/>
                            </Form.Item>
                            <Form.Item name="card-number" label="Payment details" rules={[{required: true}]}>
                                <Input className={"my-0.5 text-lg"}/>
                            </Form.Item>
                            <Form.Item name="card-date" rules={[{required: true}]}>
                                <Input className={"my-0.5 text-lg"}/>
                            </Form.Item>
                            <Form.Item name="card-region" rules={[{required: true}]}>
                                <Select options={[
                                    {value: "Uzbekistan", label: <span>Uzbekistan</span>},
                                    {value: "England", label: <span>England</span>},
                                    {value: "Russia", label: <span>Russia</span>}
                                ]}/>
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
        </div>
    );
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({form, children}) => {
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