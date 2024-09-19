import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Col, Input, Select, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { capitalCase } from "text-case";

import { labelInputClassname, PetTypeOptions, ProductTypeOptions } from "@/components/static";
import DICTIONARY from "@/modules/constant/language";
import { AddProductSchemaType } from "@/modules/payload/product";
import { ProductAddResponse } from "@/modules/response/products";
import { addProductApi } from "@/modules/services/product";
import { useFormLoading } from "@/modules/state/general";
import { AddProductSchema } from "@/modules/validation/product";

const AddProductForm = () => {
    const { Paragraph } = Typography
    const setIsFormLoading = useFormLoading((state) => state.setIsFormLoading)

    const {
        handleSubmit,
        control,
        setValue,
        getValues,
        formState: { errors }
    } = useForm<AddProductSchemaType>({
        resolver: zodResolver(AddProductSchema),
        defaultValues: {
            product_name: '',
            image_url: '',
            price: 0,
            product_type: '',
            sales_status: 'available',
            pet_type: ''
        }
    })

    const mutation = useMutation<ProductAddResponse, Error, AddProductSchemaType>({
        mutationFn: addProductApi,
        onSuccess: (data) => {
            toast.success(data.message)
        },
        onError: (error: Error) => {
            console.error(error.message)
            toast.error(error.message)
        },
        onSettled: () => {
            setIsFormLoading(false)
        }
    })

    const onSubmit = () => {
        const payload: AddProductSchemaType = {
            product_name: getValues("product_name"),
            image_url: getValues("image_url"),
            price: Number(getValues("price")),
            pet_type: getValues("pet_type"),
            product_type: getValues("product_type"),
            sales_status: "available"
        }
        console.log(payload)
        setIsFormLoading(true)
        mutation.mutate(payload)
    }

    const onInvalid = () => {
        if (errors) {
            console.log(errors)
        }
    }

    return ( 
        <form 
            id="mySubmitForm"
            className="p-5"
            onSubmit={handleSubmit(onSubmit, onInvalid)}
        >
            <Col
                className="items-center !space-y-8"
            >
                <Col>
                    <Paragraph className={labelInputClassname}>{capitalCase(DICTIONARY.MENU.PRODUCTS.LABEL.PRODUCT_NAME)}</Paragraph>
                    <Controller 
                        name="product_name"
                        control={control}
                        render={({ field }) => (
                            <Input 
                                {...field}
                                placeholder={capitalCase(DICTIONARY.MENU.PRODUCTS.LABEL.PRODUCT_NAME)}
                                status={Boolean(errors.product_name?.message) ? "error" : ""}
                            />
                        )}
                    />
                </Col>
                <Col>
                    <Paragraph className={labelInputClassname}>{capitalCase(DICTIONARY.MENU.PRODUCTS.LABEL.IMAGE_URL)}</Paragraph>
                    <Controller 
                        name="image_url"
                        control={control}
                        render={({ field }) => (
                            <Input 
                                {...field}
                                placeholder={capitalCase(DICTIONARY.MENU.PRODUCTS.LABEL.IMAGE_URL)}
                                status={Boolean(errors.image_url?.message) ? "error" : ""}
                            />
                        )}
                    />
                </Col>
                <Col>
                    <Paragraph className={labelInputClassname}>{capitalCase(DICTIONARY.MENU.PRODUCTS.LABEL.PRODUCT_TYPE)}</Paragraph>
                    <Controller 
                        name="product_type"
                        control={control}
                        render={({ field }) => (
                            <Select 
                                {...field}
                                allowClear
                                placeholder={capitalCase(DICTIONARY.MENU.PRODUCTS.LABEL.PRODUCT_TYPE)}
                                onChange={(value: string) => {
                                    setValue("product_type", value)
                                    console.log(value)
                                }}
                                style={{ width: 200 }}
                                status={Boolean(errors.product_type?.message) ? "error" : ""}
                                options={ProductTypeOptions}
                            />
                        )}
                    />
                </Col>
                <Col>
                    <Paragraph className={labelInputClassname}>{capitalCase(DICTIONARY.MENU.PRODUCTS.LABEL.PET_TYPE)}</Paragraph>
                    <Controller 
                        name="pet_type"
                        control={control}
                        render={({ field }) => (
                            <Select 
                                {...field}
                                allowClear
                                placeholder={capitalCase(DICTIONARY.MENU.PRODUCTS.LABEL.PET_TYPE)}
                                onChange={(value: string) => {
                                    setValue("pet_type", value)
                                    console.log(value)
                                }}
                                style={{ width: 200 }}
                                status={Boolean(errors.pet_type?.message) ? "error" : ""}
                                options={PetTypeOptions}
                            />
                        )}
                    />
                </Col>
                <Col>
                    <Paragraph className={labelInputClassname}>{capitalCase(DICTIONARY.MENU.PRODUCTS.LABEL.PRICE)}</Paragraph>
                    <Controller 
                        name="price"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                addonBefore="Rp."
                                type="number"
                                placeholder={capitalCase(DICTIONARY.MENU.PRODUCTS.LABEL.PRICE)}
                                status={Boolean(errors.price?.message) ? "error" : ""}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                        )}
                    />
                </Col>
            </Col>
        </form>
     );
}
 
export default AddProductForm;