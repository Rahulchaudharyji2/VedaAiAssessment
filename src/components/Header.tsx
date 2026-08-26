import { ArrowLeft, HelpCircle, Bell, Sparkles, ChevronDown, Menu } from "lucide-react";
import Image from "next/image";

export function Header() {
  const openMobileMenu = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent("open-mobile-menu"));
    }
  };
  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-4 bg-white md:m-2 md:ml-0 rounded-b-3xl md:rounded-3xl shadow-sm z-10 relative">
      <div className="flex items-center gap-2 text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">
        <ArrowLeft size={20} className="text-gray-900" />
        <span className="font-medium hidden md:flex items-center gap-2">
          <span className="p-1 bg-gray-100 rounded">
            <img src="./exam.svg" style={{background:"transparent"}} />
            {/* <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> */}
          </span>
          Exams
        </span>
        <span className="font-bold flex md:hidden text-lg text-gray-900 ml-1">
          VedaAI
        </span>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <button className="hidden md:block text-gray-400 hover:text-gray-600 transition-colors">
          <img src="./question.svg" alt="question"  style={{background:"transparent"}}/>
        </button>
        <button className="text-gray-400 hover:text-gray-600 relative transition-colors">
          <img src="./bell.svg" alt="bell"  style={{background:"transparent"}}/>
          <span className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full border border-white"></span>
        </button>
        <button className="hidden md:block text-gray-400 hover:text-gray-600 transition-colors">
          <img src="./star.svg" alt="starlogo" style={{background:"transparent"}} />
        </button>
        
        <div className="flex items-center gap-2 ml-1 md:ml-2 cursor-pointer hover:bg-gray-50 p-1 md:p-1.5 rounded-full md:pr-3 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative border border-gray-200">
             {/* Use a placeholder image that looks like the avatar in Figma */}
             <div><img src="./user.svg" alt="userlogo"  /></div>
          </div>
          <span className="hidden md:block text-sm font-medium text-gray-700">Madhur Rastogi</span>
          <ChevronDown size={16} className="hidden md:block text-gray-400" />
        </div>

        <button onClick={openMobileMenu} className="md:hidden text-gray-600 hover:text-gray-900 transition-colors ml-1">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}
