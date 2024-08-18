import { ExclamationCircleFilled } from '@ant-design/icons'
import { Modal } from "antd";

import { TModal } from "@/modules/types";

const CustomAlertModal = ( modal: TModal ) => {
    const { confirm } = Modal

    return ( 
        confirm({
            title: modal.modalTitle,
            icon: <ExclamationCircleFilled />,
            content: modal.children,
            onOk: modal.onSubmit,
        })
     );
}
 
export default CustomAlertModal;