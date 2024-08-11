import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

import items from "@/modules/constant/item";
import { TTable } from "@/modules/types";

const CustomTable = <T extends object>({ data, column, classNames }: TTable<T>) => {
    const convertCurrency = (number: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
          }).format(number)
    }

    const columns: ColumnsType<T> = column.map((col) => {

        if (col === 'image_url') {
            return {
                title: 'Image',
                dataIndex: col as string,
                key: String(col),
                // eslint-disable-next-line @next/next/no-img-element
                render: (imageUrl: string) => <img src={imageUrl} alt="Product" width={100} height={50} />
            }
        }

        if (col === 'price') {
            return {
                title: 'Price',
                dataIndex: col as string,
                key: String(col),
                render: (price: number) => convertCurrency(price)
            }
        }

        return {
            title: String(col),
            dataIndex: col as string,
            key: String(col),
        }
    });

    return (
        <Table<T>
            dataSource={data}
            columns={columns}
            rowKey={(record) => (record as any).id}
            className={classNames}
        />
    );
};

export default CustomTable;
