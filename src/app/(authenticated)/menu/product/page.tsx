'use client';
import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Row, Spin, Typography } from "antd";
import { usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { capitalCase } from "text-case";

import CustomModal from "@/components/menu/custommodal";
import CustomTable from "@/components/menu/customtable";
import AddProductForm from "@/components/menu/product/addproductform";
import DICTIONARY from "@/modules/constant/language";
import { ProductResponse } from "@/modules/response/products";
import { deleteProduct } from "@/modules/services/product";
import { useFormLoading } from "@/modules/state/general";
import { TTableColumn } from "@/modules/types";

const ProductPage = () => {
    const { Title, Paragraph } = Typography;
    const [modalOpen, setModalOpen] = useState(false)
    const IsFormLoading = useFormLoading((state) => state.isFormLoading)
    const pathname = usePathname()
    
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

    const columns: TTableColumn<ProductResponse>[] = [
        {
            label: 'Image',
            column: 'image_url'
        },
        {
            label: 'Pet Name',
            column: 'product_name'
        },
        {
            label: 'Status',
            column: 'status'
        },
        {
            label: 'Price',
            column: 'price'
        },
        {
            label: 'Breed',
            column: 'breed'
        }
    ]

    const handleModalOpen = () => {
        setModalOpen(true);
        const newPath = `${pathname}/add-product`
        window.history.replaceState(null, '', newPath)
    }

    const handleModalClose = () => {
        setModalOpen(false);
        const lastPath = `/menu/product`
        window.history.replaceState(null, '', lastPath)
    }

    const handleDeleteProduct = (record: ProductResponse) => {
        deleteProduct(record.id)
        .then((res) => {
            toast.success(res.message)
        })
    }

    return (
        <>
            <CustomModal
                modalTitle="Add Product"
                isOpen={modalOpen}
                isLoading={IsFormLoading}
                onCancel={handleModalClose}
                modalWidth={700}
                useSubmitButton
            >
                <AddProductForm />
            </CustomModal>
            <Row justify="space-between" align="middle">
                <Col>
                    <Title>{capitalCase(DICTIONARY.MENU.PRODUCTS.TITLE)}</Title>
                    <Paragraph>{capitalCase(DICTIONARY.MENU.PRODUCTS.SUBTITLE)}</Paragraph>
                </Col>
                <Button 
                    type="default" 
                    onClick={handleModalOpen} 
                    icon={<PlusOutlined />}
                >
                    {capitalCase(DICTIONARY.BUTTON.ADD_PETS)}
                </Button>
            </Row>
            {products.length > 0 && (
                <CustomTable
                    data={products}
                    columns={columns}
                    classNames="rounded-sm drop-shadow-md mt-3"
                    onDelete={handleDeleteProduct}
                />
            )}
        </>
    );
};

export default ProductPage;
