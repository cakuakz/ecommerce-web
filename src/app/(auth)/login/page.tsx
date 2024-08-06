'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "antd";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { capitalCase } from "text-case";

import AuthFormLayout from "@/components/auth/authformlayout";
import DICTIONARY from "@/modules/constant/language";
import { LoginPayloadSchemaType } from "@/modules/payload/auth";
import LoginPayloadSchema from "@/modules/validation/auth";

const Login = () => {

    const { 
        handleSubmit,
        getValues,
        control,
        formState: { errors } 
    } = useForm<LoginPayloadSchemaType>({
        resolver: zodResolver(LoginPayloadSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    })

    const onSubmit = () => {
        const payload: LoginPayloadSchemaType = {
            username: getValues('username'),
            password: getValues('password')
        }
        console.log(payload);
    };


    return (
        <div className="flex flex-col w-screen h-screen items-center justify-center">
            <AuthFormLayout>
                <Image 
                    src="/logo_ecommerce.svg"
                    alt="ecommerce logo"
                    width={250}
                    height={250}
                />
                <div className="flex flex-col items-center mt-5 space-y-5">
                    <form 
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <Controller 
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <Input
                                   {...field}
                                   placeholder={capitalCase(DICTIONARY.INPUTS.LOGIN.USERNAME)}
                                   status={Boolean(errors.username?.message) ? "error" : ""}
                                />
                            )}
                        />
                        <Controller 
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Input
                                   {...field}
                                   placeholder={capitalCase(DICTIONARY.INPUTS.LOGIN.PASSWORD)}
                                   status={Boolean(errors.password?.message) ? "error" : ""}
                                />
                            )}
                        />
                    </form>
                    <Button htmlType="submit" type="primary">Submit</Button>
                </div>
            </AuthFormLayout>
        </div>
    );
};

export default Login;
