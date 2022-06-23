import { atom } from 'recoil';

export const themeState = atom({
    key: 'themeState',
    default: {
        theme: 'light',
        mode: 'light',
        palette: {
            background: "#ffffff",
            sidebar: "#000000",
        },
    },
});