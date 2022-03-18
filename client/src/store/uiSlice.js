import { createSelector, createSlice } from "@reduxjs/toolkit";
import { get, set } from "../commons/localStrore";

const slice = createSlice({
  name: "ui",
  initialState: {
    isVisibleChanel: get("channelToggled") ?? true,
    isVisibleComplement: get("complementToggled")
      ? get("complementToggled")
      : false,
  },
  reducers: {
    expandedChannel: (state, action) => {
      const value = !state.isVisibleChanel;
      set("channelToggled", value);
      state.isVisibleChanel = value;
    },
    expandedComplement: (state, action) => {
      state.isVisibleComplement = !state.isVisibleComplement;
    },
    openedModal: (state, action) => {
      state.openedModal = action.payload;
    },
    closedModal: (state, action) => {
      state.openedModal = null;
    },
  },
});

export const isVisibleModal = (type) =>
  createSelector(
    (state) => state.ui.openedModal,
    (name) => name === type.name
  );

// export const closeModal = (dispatch) => {
//     dispatch(actions.closedModal());
//     dispatch
// }

export const isVisibleChanelSelector = (state) => state.ui.isVisibleChanel;

export default slice.reducer;
export const { expandedChannel, expandedComplement, openedModal, closedModal } =
  slice.actions;
