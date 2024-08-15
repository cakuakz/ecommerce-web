import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";

import { TTable } from "@/modules/types";

const CustomTable = <T extends object>({ 
    data, 
    columns, 
    classNames,
    onEdit,
    onDelete
}: TTable<T>) => {
    const convertCurrency = (number: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
          }).format(number)
    }

    const tableColumns: ColumnsType<T> = columns.map((col) => {

        if (col.column === 'image_url') {
            return {
                title: 'Image',
                dataIndex: col.column as string,
                key: String(col),
                // eslint-disable-next-line @next/next/no-img-element
                render: (imageUrl: string) => <img src={imageUrl} alt="Product" width={100} height={50} />
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

        return {
            title: col.label,
            dataIndex: col.column as string,
            key: String(col),
        }
    })

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

    return (
        <Table<T>
            dataSource={data}
            columns={tableColumns}
            rowKey={(record) => (record as any).id}
            className={classNames}
        />
    );
};

export default CustomTable;
