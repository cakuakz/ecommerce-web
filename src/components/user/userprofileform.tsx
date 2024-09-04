import { Flex, Input } from "antd";
import { Controller, useForm } from "react-hook-form";

import { useGetUserProperty } from "@/modules/state/general";

const UserProfileForm = () => {
    const username = useGetUserProperty((state) => state.username)
    const fullname = useGetUserProperty((state) => state.fullname)
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
                        />
                    )}
                />
            </Flex>
        </form>
     );
}
 
export default UserProfileForm;