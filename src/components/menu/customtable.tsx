import { Button, Empty, Image,Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { capitalCase } from "text-case";

import useWindowWidth from "@/modules/hooks/usewidthchecker";
import { TTable } from "@/modules/types";

const CustomTable = <T extends object>({ 
    data, 
    columns, 
    classNames,
    onEdit,
    onDelete,
    nullValueReplace,
    isActionColumn
}: TTable<T>) => {
    const convertCurrency = (number: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
          }).format(number)
    }

    const formatDate = (date: string) => {
        const selectedDate = new Date(date)

        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(selectedDate)

        return formattedDate
    }

    const windowWidth = useWindowWidth()

    const tableColumns: ColumnsType<T> = columns.map((col) => {

        if (col.column === 'image_url') {
            return {
                title: 'Image',
                dataIndex: col.column as string,
                key: String(col),
                render: (imageUrl: string) => <Image src={imageUrl} alt="Product" width={100} height={50} />
            }
        }

        if (col.column === 'price') {
            return {
                title: 'Price',
                dataIndex: col.column as string,
                key: String(col),
                render: (price: number) => convertCurrency(price)
            }
        }

        if (col.column === 'sales_status') {
            return {
                title: 'Sales Status',
                dataIndex: col.column as string,
                key: String(col),
                render: (value: string) => (
                    <Tag
                        color={`${value === "available" ? "green" : "red"} `}
                    >
                        {capitalCase(value)}
                    </Tag>
                )
            }
        }

        if (col.column === 'attendance_date') {
            return {
                title: 'Date',
                dataIndex: col.column as string,
                key: String(col),
                render: (value: string) => formatDate(value)
            }
        }

        return {
            title: col.label,
            dataIndex: col.column as string,
            key: String(col),
            render: (value) => (
                value == null ? capitalCase(nullValueReplace) : capitalCase(value)
            )
        }
    })

    if (isActionColumn) {
        tableColumns.push({
            title: 'Action',
            key: 'action',
            render: (_text, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => onEdit?.(record)}>
                        Edit
                    </Button>
                    <Button type="link" danger onClick={() => onDelete?.(record)}>
                        Delete
                    </Button>
                </Space>
            ),
        })
    }

    return (
        <Table<T>
            dataSource={data}
            columns={tableColumns}
            rowKey={(record) => (record as any).id}
            className={classNames}
            scroll={windowWidth < 1024 ? { x: 1300 } : { x: 0 }}
            locale={{
                emptyText: <Empty description="No Data" />,
            }}
        />
    );
};

export default CustomTable;
