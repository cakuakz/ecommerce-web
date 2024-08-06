import { TNavbarType } from "../types"
import DICTIONARY from "./language"

const items: TNavbarType[] = [
    {
        label: DICTIONARY.NAVBAR.HOME,
        href: "/menu"
    },
    {
        label: DICTIONARY.NAVBAR.CATEGORY,
        href: "/menu/category",
    },
    {
        label: DICTIONARY.NAVBAR.ABOUT,
        href: "/menu/about",
    },
    {
        label: DICTIONARY.NAVBAR.CONTACT,
        href: "/menu/contact",
    }
]

export default items