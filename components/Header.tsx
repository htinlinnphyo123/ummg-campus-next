import { useState } from "react";
import Link from "next/link";
import MobileNav from "./MobileNav";
import ThemeToggle from "./common/ThemeToggle";
import { NavLinks } from "./common/NavLinks";
import UniLogo from "../public/images/ummg/uni_logo.png";

export default function Header({ isHomePage = false }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="brand" aria-label="University of Medicine, Magway home">
            <img src={UniLogo.src} alt="" width={48} height={48} />
            <span>UMMG<span className="brand-caption">UNIVERSITY OF MEDICINE, MAGWAY</span></span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <NavLinks isHomePage={isHomePage} />
          </nav>
          <div className="header-actions">
            <ThemeToggle />
            <a href="https://education.ummg-campus.org/" target="_blank" rel="noopener noreferrer" className="neo-button button-small campus-link">Online campus <span aria-hidden="true">↗</span></a>
            <button className="menu-toggle" aria-label={isOpen ? "Close navigation" : "Open navigation"} aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen(!isOpen)}>
              <span aria-hidden="true">{isOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </header>
      <MobileNav isOpen={isOpen} closeSidebar={() => setIsOpen(false)} />
    </>
  );
}
