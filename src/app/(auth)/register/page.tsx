'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Typography } from "antd";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { capitalCase } from "text-case";

import AuthFormLayout from "@/components/auth/authformlayout";
import DICTIONARY from "@/modules/constant/language";
import { RegisterPayloadSchemaType } from "@/modules/payload/auth";
import { RegisterPayloadSchema } from "@/modules/validation/auth";

const Register = () => {

    const { 
        handleSubmit,
        getValues,
        control,
        formState: { errors } 
    } = useForm<RegisterPayloadSchemaType>({
        resolver: zodResolver(RegisterPayloadSchema),
        defaultValues: {
            username: '',
            password: '',
            fullname: ''
        }
    })

    const onSubmit = async () => {
        const payload: RegisterPayloadSchemaType = {
            username: getValues('username'),
            password: getValues('password'),
            fullname: getValues('fullname')
        }
        console.log(payload);
        const response = await fetch('/api/auth/add-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
      
          if (response.ok) {
            window.location.href = '/login';
          } else {
            console.error('Failed to register');
          }
    };


    const { Title } = Typography

    return ( 
        <div className="flex flex-col w-screen h-screen items-center justify-center">
            <AuthFormLayout>
                <Image 
                    src="/logo_ecommerce.svg"
                    alt="ecommerce logo"
                    width={250}
                    height={250}
                />
                <Title>Register</Title>
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
                                   placeholder={capitalCase(DICTIONARY.INPUTS.REGISTER.USERNAME)}
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
                                   placeholder={capitalCase(DICTIONARY.INPUTS.REGISTER.PASSWORD)}
                                   status={Boolean(errors.password?.message) ? "error" : ""}
                                />
                            )}
                        />
                        <Controller 
                            name="fullname"
                            control={control}
                            render={({ field }) => (
                                <Input
                                   {...field}
                                   placeholder={capitalCase(DICTIONARY.INPUTS.REGISTER.FULLNAME)}
                                   status={Boolean(errors.fullname?.message) ? "error" : ""}
                                />
                            )}
                        />
                        <Button
                            htmlType="submit"
                        >
                            Register
                        </Button>
                    </form>
                </div>
            </AuthFormLayout>
        </div>
     );
}
 
export default Register;