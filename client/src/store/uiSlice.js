import { createSelector, createSlice } from "@reduxjs/toolkit";
import { get, set } from "../commons/localStrore";

const slice = createSlice({
  name: "ui",
  initialState: {
    isVisibleChanel: get("channelToggled") ?? true,
    isVisibleComplement: get("complementToggled")
      ? get("complementToggled")
      : false,
    isMute: get("mute") ?? false,
    isDeafen: get("deafen") ?? false,
    isVoiceConnected: get("voiceConnected") ?? false,
    replies: get("replies") ?? [],
    //isCallEnded: 
  },
  reducers: {
    replyMessages: (state, action) => {
      const { payload } = action;
      // set("replies", payload);
      state.replies = payload;
    },
    expandedChannel: (state, action) => {
      const value = !state.isVisibleChanel;
      set("channelToggled", value);
      state.isVisibleChanel = value;
    },
    expandedComplement: (state, action) => {
      state.isVisibleComplement = !state.isVisibleComplement;
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
} = slice.actions;
