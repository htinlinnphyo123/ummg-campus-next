import { useState } from "react";
import MobileNav from "./MobileNav";
import ThemeToggle from "./common/ThemeToggle";
import { NavLinks } from "./common/NavLinks";
import useHeaderToggler from "../hooks/header-toggler";
import UniLogo from "../public/images/ummg/uni_logo.png"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  const {isHeaderVisible} = useHeaderToggler();
  const handleScrollTo = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      closeSidebar();
    }
  };

  return (
    <>
      <header className={`p-4 fixed top-0 left-0 font-bold w-full z-10 ${!isHeaderVisible ? 'bg-transparent text-[#333333]' : 'bg-[#ece7e7f6] dark:bg-[#0f1114f5]'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xl font-bold">
            <span
              onClick={() => {
                handleScrollTo("home");
              }}
              className={`flex items-center cursor-pointer tracking-wide ${!isHeaderVisible ? 'text-white' : ''}`}
            >
              <img
                src={UniLogo.src}
                alt="Lucky Click Logo"
                className="h-12 w-12 mr-2 rounded-sm"
              />
              UMMG
            </span>
          </div>

          <div className={`hidden md:flex items-center gap-4 py-2 px-4 transition-all duration-100
          ${!isHeaderVisible
            ? 'bg-white text-black dark:bg-black dark:text-white bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-full'
            : ''
          }`}>
            <NavLinks className="px-3 py-1" />
            <ThemeToggle />
          </div>

          <button
            onClick={toggleSidebar}
            className="md:hidden px-2 py-1 border rounded"
          >
            ☰
          </button>
        </div>
      </header>
      <MobileNav isOpen={isOpen} closeSidebar={closeSidebar} />
    </>
  );
}
