import {Avatar, Button, Drawer, List, message, Modal, Space, Tooltip, Typography} from "antd";
import {DeleteOutlined, LogoutOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {checkout, deleteItemFromCart, getCart} from "../utils";

const {Text} = Typography;

const MyCart = (props) => {
    const [cartVisible, setCartVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cartData, setCartData] = useState({});
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(false);

    // get cart
    useEffect(() => {
        // case1: cart is not visible -> return
        if (!cartVisible) {
            return;
        }
        // case2: cart is visible
        // step1: set loading status -> true
        setLoading(true);
        // step2: fetch cart data
        getCart()
            // case1: success -> setCartData
            .then((data) => {
                setCartData(data);
            })
            // case2: fail -> inform user
            .catch((err) => {
                message.error(err.message);
            })
            // finally, set loading status -> false
            .finally(() => {
                setLoading(false);
            });
    }, [cartVisible]);

    // check out
    const onCheckOut = () => {
        setChecking(true);
        checkout()
            .then(() => {
                message.success("Successfully checkout");
                setCartVisible(false);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setChecking(false);
            });
    };

    // delete item from cart
    const DeleteFromCart = (itemId) => {
        console.log(itemId)
        setLoading(true);
        deleteItemFromCart(itemId)
            .then(() => {
                getCart()
                    .then((data) => {
                        setCartData(data);
                        message.success(`Successfully delete item`);
                    })
                    .catch((err) => {
                        message.error(err.message);
                    })
            })
            .catch((err) => message.error(err.message))
            .finally(() => {
                setLoading(false);
            });
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        props.onLogout();
        message.success(`Logout Successfully`);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onCloseDrawer = () => {
        setCartVisible(false);
    };

    const onOpenDrawer = () => {
        setCartVisible(true);
    };

    return (
        <>
            <Space size="large">
                <Button type="primary" shape="round" icon={<ShoppingCartOutlined/>} onClick={onOpenDrawer}>
                    Cart
                </Button>
                <Button shape="round" icon={<LogoutOutlined/>} onClick={showModal}>
                    log out
                </Button>
            </Space>
            <Modal visible={isModalVisible} okText="Yes" onOk={handleOk} onCancel={handleCancel}>
                <p>Do you want to log out?</p>
            </Modal>
            <Drawer
                title="My Shopping Cart"
                onClose={onCloseDrawer}
                visible={cartVisible}
                width={400}
                footer={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text strong={true}>{`Total price: $${cartData.totalPrice ? cartData.totalPrice : 0}`}</Text>
                        <div>
                            <Button onClick={onCloseDrawer} style={{marginRight: 8}}>
                                Cancel
                            </Button>
                            <Button
                                onClick={onCheckOut}
                                type="primary"
                                loading={checking}
                                disabled={loading || (cartData.orderItemList && cartData.orderItemList.length === 0)}
                            >
                                Checkout
                            </Button>
                        </div>
                    </div>
                }
            >
                <List
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={cartData?.orderItemList}
                    renderItem={(item) => (
                        <List.Item actions={[
                            <Tooltip title="Delete from shopping cart">
                                <Button
                                    icon={<DeleteOutlined/>}
                                    onClick={() => DeleteFromCart(item.id)}
                                />
                            </Tooltip>
                        ]}>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={item.menuItem.imageUrl}/>
                                }
                                title={item.menuItem.name}
                                description={`$${item.price}`}
                            />
                        </List.Item>
                    )}
                />
            </Drawer>
        </>
    );
};

export default MyCart;