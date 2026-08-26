import Link from "next/link";
import { Home, Users, FileText, ClipboardList, BookOpen, Settings, LayoutDashboard, Search, Bell, Sparkles } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-full rounded-tr-3xl rounded-br-3xl shadow-sm m-2">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/veda.svg" alt="VedaAI Logo" className="w-10 h-10 object-contain" />
          <span className="font-bold text-xl tracking-tight text-gray-900">VedaAI</span>
        </div>
        {/* <button className="text-gray-400 hover:text-gray-600 border border-gray-200 p-1.5 rounded-lg bg-gray-50"> */}
          {/* <LayoutDashboard size={18} /> */}
          <img src="/side.svg" alt="side" />
        {/* </button> */}
      </div>

      <div className="px-4 mb-6 mt-2">
        <button className="w-full bg-gradient-to-b from-[#3a3a3a] to-[#252525] text-white rounded-full py-2.5 px-4 flex items-center justify-center gap-2 font-medium shadow-lg border-[3px] border-[#f07b57] hover:from-[#4a4a4a] hover:to-[#353535] transition-colors">
          <Sparkles size={18} className="text-white" fill="white" />
          AI Teacher's Toolkit
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <SidebarItem icon={<img src="/home.svg" alt="Home" className="w-5 h-5" />} label="Home" />
        <SidebarItem icon={<img src="/myClassroom.svg" alt="My Classroom" className="w-5 h-5" />} label="My Classroom" />
        <SidebarItem icon={<img src="/assignment.svg" alt="Assignments" className="w-5 h-5" />} label="Assignments" />
        <SidebarItem icon={<img src="/exam.svg" alt="Exams" className="w-5 h-5" />} label="Exams" active />
        <SidebarItem icon={<img src="/mylibrary.svg" alt="My Library" className="w-5 h-5" />} label="My Library" />
      </nav>

      <div className="p-4 mt-auto">
        <SidebarItem icon={<Settings size={20} />} label="Settings" />
        
        <div className="mt-4 bg-gray-50 rounded-xl p-3 flex items-center gap-3 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200">
            <span className="text-green-600 text-lg"><img src="./dps.svg" alt="" /></span>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-800">Delhi Public School</div>
            <div className="text-xs text-gray-500">Bokaro Steel City</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link 
      href="#"
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
        active 
          ? "bg-gray-100 text-gray-900 font-medium" 
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <span className={active ? "text-gray-700" : "text-gray-400"}>{icon}</span>
      {label}
    </Link>
  );
}
