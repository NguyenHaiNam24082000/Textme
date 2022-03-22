import UserArea from "./bottom/UserArea";
export default function SidebarBase({ children }) {
  return (
    <div
      className="flex flex-col w-64 h-full flex-shrink-0 overflow-hidden"
      style={{ backgroundColor: "#f3f4f6", borderRight: "2px solid #e5e7eb" }}
    >
      <nav className="flex flex-col w-full flex-auto min-h-0">{children}</nav>
      <UserArea />
    </div>
  );
}
