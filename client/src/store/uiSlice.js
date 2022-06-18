import { createSelector, createSlice } from "@reduxjs/toolkit";
import { get, set } from "../commons/localStrore";

const slice = createSlice({
  name: "ui",
  initialState: {
    isVisibleChanel: get("channelToggled") ?? true,
    isVisibleComplement: get("complementToggled") ?? false,
    activeComplement: "main",
    isMute: get("mute") ?? false,
    isDeafen: get("deafen") ?? false,
    isVoiceConnected: get("voiceConnected") ?? false,
    replies: get("replies") ?? {},
    theme: get("theme") ?? {},
    nearBy: undefined,
    //isCallEnded:
  },
  reducers: {
    setNearBy: function (state, action) {
      state.nearBy = action.payload;
    },
    replyMessages: (state, action) => {
      const { payload } = action;
      // set("replies", payload);
      state.replies[payload.id] = payload.messages;
    },
    expandedChannel: (state, action) => {
      const value = !state.isVisibleChanel;
      set("channelToggled", value);
      state.isVisibleChanel = value;
    },
    expandedComplement: (state, action) => {
      if (action.payload === null || action.payload === undefined) {
        state.isVisibleComplement = !state.isVisibleComplement;
      } else {
        state.isVisibleComplement = action.payload;
      }
    },
    setActiveComplement: (state, action) => {
      state.activeComplement = action.payload;
    },
    mute: (state, action) => {
      state.isMute = action.payload;
    },
    deafen: (state, action) => {
      state.isDeafen = action.payload;
    },
    openedModal: (state, action) => {
      state.openedModal = action.payload;
    },
    closedModal: (state, action) => {
      state.openedModal = null;
    },
    voiceConnected: (state, action) => {
      state.isVoiceConnected = action.payload;
    },
    setTheme: (state, action) => {
      set("theme", JSON.stringify(action.payload));
      state.theme = action.payload;
    },
  },
});

export const isVisibleModal = (type) =>
  createSelector(
    (state) => state.ui.openedModal,
    (name) => name === type.name
  );

export const repliesSelector = (state) => state.ui.replies;
export const isVisibleChanel = (state) => state.ui.isVisibleChanel;
export const isVisibleComplement = (state) => state.ui.isVisibleComplement;
export const isMute = (state) => state.ui.isMute;
export const isDeafen = (state) => state.ui.isDeafen;
export const isVoiceConnectedSelector = (state) => state.ui.isVoiceConnected;
export const themeSelector = (state) => state.ui.theme;
export const activeComplementSelector = (state) => state.ui.activeComplement;
export const nearBySelector = (state) => state.ui.nearBy;
// export const closeModal = (dispatch) => {
//     dispatch(actions.closedModal());
//     dispatch
// }

export const isVisibleChanelSelector = (state) => state.ui.isVisibleChanel;

export default slice.reducer;
export const {
  replyMessages,
  expandedChannel,
  expandedComplement,
  openedModal,
  closedModal,
  mute,
  deafen,
  voiceConnected,
  setTheme,
  setActiveComplement,
  setNearBy,
} = slice.actions;
