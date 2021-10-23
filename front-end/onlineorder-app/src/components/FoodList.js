import { Button, Card, List, message, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { addItemToCart, getMenus, getRestaurants } from "../utils";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddToCartButton = ({ itemId }) => {
    const [loading, setLoading] = useState(false);

    const AddToCart = () => {
        setLoading(true);
        addItemToCart(itemId)
            .then(() => {
                message.success(`Successfully add item`);
                setLoading(false);
            })
            .catch((err) => message.error(err.message))
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Tooltip title="Add to shopping cart">
            <Button
                loading={loading}
                type="primary"
                icon={<PlusOutlined />}
                onClick={AddToCart}
            />
        </Tooltip>
    );
};

const FoodList = () => {
    const [foodData, setFoodData] = useState([]);
    const [curRest, setCurRest] = useState();
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingRest, setLoadingRest] = useState(false);

    // componentDidMount + componentDidUpdate
    // if second parameter is set to [], then componentDidMount only
    useEffect(() => {
        // step1: set loading status to true
        setLoadingRest(true);
        // step2: fetch restaurants data from server
        // step2.1:
        getRestaurants()
            // case1: success
            .then((data) => {
                setRestaurants(data);
            })
            // case2: failed
            .catch((err) => {
                message.error(err.message);
            })
            // finally, set loading status to false
            .finally(() => {
                setLoadingRest(false);
            });
    }, []);

    // componentDidUpdate -> update selected restaurant
    useEffect(() => {
        if (curRest) {
            // step1: set loading status to true
            setLoading(true);
            // step2: fetch menu data from server
            // step2.1:
            getMenus(curRest)
                // case1: success
                .then((data) => {
                    setFoodData(data);
                })
                // case2: failed
                .catch((err) => {
                    message.error(err.message);
                })
                // finally, set loading status to false
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [curRest]);

    return (
        <>
            <Select
                value={curRest}
                onSelect={(value) => setCurRest(value)}
                placeholder="Select a restaurant"
                loading={loadingRest}
                style={{ width: 300 }}
                onChange={() => {}}
            >
                {restaurants.map((item) => {
                    return <Option key={item.id} value={item.id}>{item.name}</Option>;
                })}
            </Select>
            {curRest && (
                <List
                    style={{ marginTop: 20 }}
                    loading={loading}
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 3,
                        xxl: 3,
                    }}
                    dataSource={foodData}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                title={item.name}
                                extra={<AddToCartButton itemId={item.id} />}
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    style={{ height: "auto", width: "100%", display: "block" }}
                                />
                                {`Price: $${item.price}`}
                            </Card>
                        </List.Item>
                    )}
                />
            )}
        </>
    );
}

export default FoodList;