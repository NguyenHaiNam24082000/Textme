import Button3D from "../../../../Button3D";

const shortcutKeys = {
  Default: [
    {
      name: "New Message",
      key: "Alt+Shift+1",
      description: "Create a new message",
    },
  ],
  User_Settings: [
    {
      name: "Change Password",
      key: "Alt+Shift+2",
      description: "Change your password",
    },
    {
      name: "Change Email",
      key: "Alt+Shift+3",
      description: "Change your email",
    },
    {
      name: "Change Username",
      key: "Alt+Shift+4",
      description: "Change your username",
    },
    {
      name: "Change Profile Picture",
      key: "Alt+Shift+5",
      description: "Change your profile picture",
    },
    {
      name: "Change Background Picture",
      key: "Alt+Shift+6",
      description: "Change your background picture",
    },
    {
      name: "Change Language",
      key: "Alt+Shift+7",
      description: "Change your language",
    },
    {
      name: "Change Theme",
      key: "Alt+Shift+8",
      description: "Change your theme",
    },
    {
      name: "Change Timezone",
      key: "Alt+Shift+9",
      description: "Change your timezone",
    },
    {
      name: "Change Notification Sound",
      key: "Alt+Shift+0",
      description: "Change your notification sound",
    },
    {
      name: "Change Notification Volume",
      key: "Alt+Shift+-",
      description: "Change your notification volume",
    },
  ],
};

export default function Hotkeys() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full">
        <div className="flex flex-col w-full gap-2 relative">
          <h3 className="text-xl font-semibold mb-3">Language</h3>
          {shortcutKeys.Default.map((hotkey) => (
            <>
              {hotkey.name}
              {hotkey.key.split("+").map((key, index) => (
                <Button3D
                  className="flex w-full h-full p-2 rounded-md justify-between items-center cursor-pointer"
                  content={key}
                />
              ))}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
