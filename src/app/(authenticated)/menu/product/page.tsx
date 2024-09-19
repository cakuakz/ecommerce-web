'use client';
import { DownloadOutlined,PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Row, Spin, Typography } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { capitalCase } from "text-case";

import CustomAlertModal from "@/components/menu/customalertmodal";
import CustomModal from "@/components/menu/custommodal";
import CustomTable from "@/components/menu/customtable";
import AddProductForm from "@/components/menu/product/addproductform";
import DICTIONARY from "@/modules/constant/language";
import { ProductResponse } from "@/modules/response/products";
import { generateCsvUrl } from "@/modules/services/downloadcsv";
import { deleteProduct } from "@/modules/services/product";
import { useFormLoading } from "@/modules/state/general";
import { TTableColumn } from "@/modules/types";

const ProductPage = () => {
    const { Title, Paragraph } = Typography;
    const [modalOpen, setModalOpen] = useState(false)
    const IsFormLoading = useFormLoading((state) => state.isFormLoading)
    const pathname = usePathname()
    const router = useRouter()
    
    const { isLoading, error, data } = useQuery({
        queryKey: ['getProducts'],
        queryFn: () =>
          fetch('/api/products/get-products').then((res) =>
            res.json(),
          ),
    });

    if (isLoading) return <Spin spinning />;

    if (error) return <div>Error Loading Page...</div>;

    const products = data?.products || [];

    const columns: TTableColumn<ProductResponse>[] = [
        {
            label: 'Image',
            column: 'image_url'
        },
        {
            label: 'Product Name',
            column: 'product_name'
        },
        {
            label: 'Pet Type',
            column: 'pet_type'
        },
        {
            label: 'Price',
            column: 'price'
        },
        {
            label: 'Product Type',
            column: 'product_type'
        },
        {
            label: 'Sales Status',
            column: 'sales_status'
        }
    ]

    const handleModalOpen = () => {
        setModalOpen(true);
        const newPath = `${pathname}/add`
        window.history.replaceState(null, '', newPath)
    }

    const handleModalClose = () => {
        setModalOpen(false);
        const lastPath = `/menu/product`
        window.history.replaceState(null, '', lastPath)
    }

    const handleDeleteProduct = (record: ProductResponse) => {
        CustomAlertModal({
            modalTitle: capitalCase(DICTIONARY.WARNING.DELETE),
            onSubmit: async () => {
                try {
                    const response = await deleteProduct(record.id)
                    toast.success(response.message)
                } catch (error) {
                    toast.error("Failed to delete product")
                }
            },
            children: <Paragraph>{capitalCase(DICTIONARY.WARNING.DELETE_SUBTITLE)}</Paragraph>
        })
    }

    const handleDownload = async () => {
        try {
            const url = await generateCsvUrl()
            const a = document.createElement('a')
            a.href = url;
            a.download = 'products.csv'
            a.click();
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Failed to download CSV:', error);
        }
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
                <Col>
                    <Button
                        type="default"
                        onClick={handleDownload}
                        icon={<DownloadOutlined />}
                        className="!bg-slate-100 mr-4"
                    >
                        Download CSV
                    </Button>
                    <Button 
                        type="default" 
                        onClick={handleModalOpen} 
                        icon={<PlusOutlined />}
                    >
                        {capitalCase(DICTIONARY.BUTTON.ADD_PETS)}
                    </Button>
                </Col>
            </Row>
            {products.length > 0 && (
                <CustomTable
                    data={products}
                    columns={columns}
                    classNames="rounded-sm drop-shadow-md mt-3"
                    onDelete={handleDeleteProduct}
                    nullValueReplace=""
                />
            )}
        </>
    );
};

export default ProductPage;
