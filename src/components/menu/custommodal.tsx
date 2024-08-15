import { Button, Modal } from "antd"
import { capitalCase } from "text-case"

import { TModal } from "@/modules/types"

const CustomModal = ( modal: TModal) => {
    return (
        <Modal
            title={modal.modalTitle}
            open={modal.isOpen}
            centered
            onCancel={modal.onCancel}
            width={modal.modalWidth ? modal.modalWidth : 500}
            footer={[
                modal.useCancelButton && (
                    <Button 
                        key="back"
                        onClick={modal.onCancel}
                    >
                        {modal.cancelText ? capitalCase(modal.cancelText) : "Cancel"}
                    </Button>
                ),
                modal.useSubmitButton && (
                    <Button
                        key="submit"
                        form="mySubmitForm"
                        htmlType="submit"
                        type="primary"
                        loading={modal.isLoading}
                    >
                        {modal.submitText ? capitalCase(modal.submitText) : "Submit"}
                    </Button>
                ),
                modal.useActionButton && (
                    <Button
                        onClick={modal.onAction}
                        type="primary"
                    >
                        {modal.actionText ? capitalCase(modal.actionText) : "Action"}
                    </Button>
                )
            ]}
        >
            {modal.children}
        </Modal>
    )
}

export default CustomModal