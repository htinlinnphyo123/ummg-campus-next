import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { MobileNavProps } from "../types/MobileNavProps";
import { NavLinks } from "./common/NavLinks";

export default function MobileNav({ isOpen, closeSidebar }: MobileNavProps) {
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isOpen) dialog.current?.showModal();
    else dialog.current?.close();
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1100px)");
    const onResize = () => { if (desktop.matches) closeSidebar(); };
    desktop.addEventListener("change", onResize);
    return () => { document.body.style.overflow = previousOverflow; desktop.removeEventListener("change", onResize); };
  }, [isOpen, closeSidebar]);

  return (
    <dialog ref={dialog} id="mobile-navigation" className="mobile-navigation" aria-label="Main navigation" onCancel={closeSidebar} onClick={(event) => { if (event.target === dialog.current) closeSidebar(); }}>
      <div className="mobile-nav-heading"><strong>Explore UMMG</strong><button className="menu-toggle" onClick={closeSidebar} aria-label="Close navigation">✕</button></div>
      <nav aria-label="Mobile navigation"><NavLinks isHomePage={router.pathname === "/"} onClick={closeSidebar} /></nav>
      <a href="https://education.ummg-campus.org/" target="_blank" rel="noopener noreferrer" className="neo-button" onClick={closeSidebar}>Online campus ↗</a>
    </dialog>
  );
}
