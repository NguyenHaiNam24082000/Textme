import UserArea from "./bottom/UserArea";
import { useSelector } from "react-redux";
import { themeSelector } from "../../store/uiSlice";

export default function SidebarBase({ children }) {
  const theme = useSelector(themeSelector);
  return (
    <div
      className="flex flex-col w-64 h-full flex-shrink-0 overflow-hidden bg-slate-300"
      style={{ backgroundColor: theme.channelBackground }}
    >
      <nav className="flex flex-col w-full flex-auto min-h-0">{children}</nav>
      <UserArea />
    </div>
  );
}
