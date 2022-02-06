import React from "react";
import Modal from "../../Modal";
import Sidebar from "../../Sidebar";

export default function ModalUsersSetting({opened, onClose}) {
  return (
    <Modal
      size="70%"
      opened={opened}
      onClose={onClose}
      title="Settings"
      classNames={{ modal: "h-full" }}
      zIndex="200"
    >
      <Sidebar />
      {/* <Tabs tabPosition="left" type="button">
              <TabPane
                  tab={
                      <span>
                          Document
                      </span>
                  }
                  itemKey="1"
              >
                  <div style={{ padding: '0 24px' }}> Document </div>
              </TabPane>
              <TabPane
                  tab={
                      <span>
                          Quick Start
                      </span>
                  }
                  itemKey="2"
              >
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
                  <div style={{ padding: '0 24px' }}>Quick Start</div>
              </TabPane>
              <TabPane
                  tab={
                      <span>
                          Help
                      </span>
                  }
                  itemKey="3"
              >
                  <div style={{ padding: '0 24px' }}>Help</div>
              </TabPane>
          </Tabs> */}
    </Modal>
  );
}
