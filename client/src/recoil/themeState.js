import { atom } from 'recoil';

export const themeState = atom({
    key: 'themeState',
    default: {
        theme: 'light',
        mode: 'light',
        palette: {
            background: "#000000",
            sidebar: "#000000",
        },
    },
});