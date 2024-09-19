import { Button, Flex, Input } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { useGetUserProperty } from "@/modules/state/general";

const UserProfileForm = () => {
    const username = useGetUserProperty((state) => state.username)
    const fullname = useGetUserProperty((state) => state.fullname)
    const [isEdit, setIsEdit] = useState(false)
    const {
        control
    } = useForm({
        defaultValues: {
            username: username,
            fullname: fullname
        }
    })

    return ( 
        <form
            className="w-screen"
        >
            <Flex 
                align="center" 
                gap={16}
                className="!p-5"
            >
                <h1 className="text-base">Username: </h1>
                <Controller 
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="Username"
                            disabled={!isEdit}
                        />
                    )}
                />
            </Flex>
            <Flex 
                align="center" 
                gap={16}
                className="!p-5"
            >
                <h1 className="text-base">Fullname: </h1>
                <Controller 
                    name="fullname"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="Fullname"
                            disabled={!isEdit}
                        />
                    )}
                />
            </Flex>
            {isEdit ? (
                <div className="flex space-x-3 justify-end mx-5">
                    <Button
                        danger
                        onClick={() => setIsEdit(false)}
                    >
                        Cancel Edit
                    </Button>
                    <Button
                        type="primary"
                    >
                        Save
                    </Button>
                </div>
            ) : (
                <div className="flex justify-end mx-5">
                    <Button
                        type="primary"
                        onClick={() => setIsEdit(true)}
                        className="px-8"
                    >
                        Edit Profile
                    </Button>
                </div>
            )}
        </form>
     );
}
 
export default UserProfileForm;