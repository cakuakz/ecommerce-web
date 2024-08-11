'use client';
import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Row, Spin, Typography } from "antd";

import CustomTable from "@/components/menu/customtable";

const ProductPage = () => {
    const { Title } = Typography;
    
    const { isLoading, error, data } = useQuery({
        queryKey: ['getProducts'],
        queryFn: () =>
          fetch('/api/products/get-products').then((res) =>
            res.json(),
          ),
    });

    if (isLoading) return <Spin spinning />;

    if (error) return <div>ini error bang</div>;

    const products = data?.products || [];

    const columns = ['image_url', 'product_name', 'status', 'price', 'breed'];

    return (
        <>
            <Row justify="space-between" align="middle">
                <Title>Product Page</Title>
                <Button type="default" icon={<PlusOutlined />}>Add Product</Button>
            </Row>
            {products.length > 0 && (
                <CustomTable
                    data={products}
                    column={columns}
                    classNames="rounded-sm drop-shadow-md mt-3"
                />
            )}
        </>
    );
};

export default ProductPage;
