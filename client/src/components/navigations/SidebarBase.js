export default function SidebarBase({ children }) {
  return (
    <div
      className="flex flex-col w-64 h-full flex-shrink-0 overflow-hidden"
      style={{ backgroundColor: "#f3f4f6", borderRight: "2px solid #e5e7eb" }}
    >
      {children}
    </div>
  );
}
