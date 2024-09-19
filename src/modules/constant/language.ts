const DICTIONARY = {
    INPUTS: {
        LOGIN: {
            USERNAME: "USERNAME",
            PASSWORD: "PASSWORD"
        },
        REGISTER: {
            USERNAME: "USERNAME",
            PASSWORD: "PASSWORD",
            FULLNAME: "FULLNAME"
        }
    },
    SIDEBAR: {
        DASHBOARD: "DASHBOARD",
        PRODUCTS: "PRODUCTS",
        USER: "USER",
        USER_PROFILE: "PROFILE",
        USER_CHANGE_PASS: "CHANGE PASSWORD",
        USER_PRESENCE: "PRESENCE",
        LOGOUT: "LOGOUT",
    },
    VALIDATION: {
        REQUIRED_FIELD: "THIS FIELD IS REQUIRED"
    },
    BUTTON: {
        SUBMIT: "SUBMIT",
        CANCEL: "CANCEL",
        ADD_PETS: "ADD PETS"
    },
    MENU: {
        DASHBOARD: {

        },
        PRODUCTS: {
            TITLE: "PRODUCTS PAGE",
            SUBTITLE: "PETS MANAGEMENT PAGE",
            LABEL: {
                PRODUCT_NAME: "PRODUCT NAME",
                IMAGE_URL: "IMAGE URL",
                PRICE: "PRICE",
                PRODUCT_TYPE: "PRODUCT TYPE",
                SALES_STATUS: "SALES STATUS",
                PET_TYPE: "PET TYPE"
            },
            PRODUCT_TYPE: {
                FOOD: "PET FOOD",
                HEALTHCARE: "PET HEALTHCARE",
                ACCESSORIES: "PET ACCESSORIES"
            },
            PET_SALES: {
                AVAILABLE: "AVAILABLE",
                SOLD: "SOLD"
            },
            PET_TYPE: {
                CAT: "CAT",
                DOG: "DOG"
            }
        },
        USER_MANAGEMENT: {
            PROFILE: {
                TITLE: "DETAIL PROFILE",
                SUBTITLE: "USER PROFILE PAGE"
            },
            CHANGE_PASS: {
                TITLE: "CHANGE PASSWORD",
                SUBTITLE: "USER CHANGE PASSWORD PAGE"
            },
            PRESENCE: {
                TITLE: "PRESENCE",
                SUBTITLE: "USER PRESENCE PAGE"
            }
        }
    },
    PET_BREED: {
        BRITISH_SHORTHAIR: "BRITISH SHORTHAIR",
        AMERICAN_SHORTHAIR: "AMERICAN SHORTHAIR",
        INDONESIAN_SHORTHAIR: "INDONESIAN SHORTHAIR",
        MAINE_COON: "MAINE COON",
        SCOTTISH_FOLD: "SCOTTISH FOLD",
        MUNCHKIN: "MUNCHKIN",
        RAGDOLL: "RAGDOLL",
        OREN: "OREN",
        EGYPTIAN_MAU: "EGYPTIAN MAU",
        PERSIAN_CAT: "PERSIAN CAT"
    },
    WARNING: {
        DELETE: "ARE YOU SURE YOU WANT TO DELETE THIS?",
        DELETE_SUBTITLE: "THIS DATA WILL BE DELETED PERMANENTLY"
    }
}

export default DICTIONARY