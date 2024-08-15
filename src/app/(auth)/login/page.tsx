'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';
import { Button, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { capitalCase } from "text-case";

import AuthFormLayout from "@/components/auth/authformlayout";
import DICTIONARY from "@/modules/constant/language";
import { LoginPayloadSchemaType } from "@/modules/payload/auth";
import { login, SignInResponse } from "@/modules/services/auth";
import { LoginPayloadSchema } from "@/modules/validation/auth";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const route = useRouter()

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
    });

    const mutation = useMutation<SignInResponse, Error, LoginPayloadSchemaType>({
        mutationFn: login,
        onSuccess: () => {
            route.push("/menu")
        },
        onError: (error: Error) => {
            console.error(error.message);
        },
        onSettled: () => {
            setLoading(false);
        },
    });

    const onSubmit = () => {
        const payload: LoginPayloadSchemaType = {
            username: getValues('username'),
            password: getValues('password')
        };
        setLoading(true);
        mutation.mutate(payload);
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
                                   type="password"
                                   placeholder={capitalCase(DICTIONARY.INPUTS.LOGIN.PASSWORD)}
                                   status={Boolean(errors.password?.message) ? "error" : ""}
                                />
                            )}
                        />
                        <Button htmlType="submit" type="primary" loading={loading}>{capitalCase(DICTIONARY.BUTTON.SUBMIT)}</Button>
                    </form>
                    <div className="mt-4 flex flex-row space-x-2">
                        <p className="text-base font-normal text-slate-400">Dont Have Account?</p>
                        <Link href="/register">Register</Link>
                    </div>
                </div>
            </AuthFormLayout>
        </div>
    );
};

export default Login;
