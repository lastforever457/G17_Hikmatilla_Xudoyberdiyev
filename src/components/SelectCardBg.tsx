import React, {useContext} from 'react';
import {Button, Col, Drawer, Row, Space} from 'antd';
import {ImgContext} from "../contexts/ImagesContext";

const SelectCardBg = ({open, setOpen, choosenImage, setChoosenImage}: {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    choosenImage: string,
    setChoosenImage: React.Dispatch<React.SetStateAction<string>>
}) => {
    const images = useContext(ImgContext);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Drawer
                title="Choose card background"
                placement={"right"}
                width={1000}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" onClick={onClose}>
                            Set
                        </Button>
                    </Space>
                }
            >
                <Row>
                    {images.map((img: string) => (
                        <Col xs={24} sm={24} md={12} lg={8} key={img}>
                            <div onClick={() => setChoosenImage(img)}
                                 className={`${choosenImage === img ? "border-slate-500" : "border-transparent"} border-2 p-1 h-[200px]`}>
                                <img src={img} className={"w-[100%] h-[100%] bg-cover bg-center"} alt="card"/>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Drawer>
        </>
    );
};

export default SelectCardBg;