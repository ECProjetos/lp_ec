"use client";
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaLinkedin } from "react-icons/fa"; // ← ícones das redes

export function NavbarDemo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />

        {/* Ícones de redes sociais */}
        <div className="flex items-center gap-4">
          {/* WhatsApp */}
          <a
            href="https://wa.me/5548991147704"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Converse conosco no WhatsApp"
            className="text-xl text-gray-700 hover:text-green-600 transition-colors"
          >
            <FaWhatsapp />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/ecprojetos_infra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visite nosso Instagram"
            className="text-xl text-gray-700 hover:text-pink-600 transition-colors"
          >
            <FaInstagram />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/ecprojetos"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visite nosso LinkedIn"
            className="text-xl text-gray-700 hover:text-blue-700 transition-colors"
          >
            <FaLinkedin />
          </a>
        </div>
      </NavBody>

      {/* Mobile nav */}
      {/* Mobile nav */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        {/* Opções do menu — aparecem apenas quando o toggle está ativo */}
        {isMobileMenuOpen && (
          <div className="flex flex-col items-center gap-6 py-6 animate-fadeIn">
            {/* Links principais */}
            <Link
              href="/"
              className="text-lg text-gray-800 hover:text-blue-600 transition-colors"
            >
              Início
            </Link>
            <Link
              href="/sobre"
              className="text-lg text-gray-800 hover:text-blue-600 transition-colors"
            >
              Sobre
            </Link>
            <Link
              href="/servicos"
              className="text-lg text-gray-800 hover:text-blue-600 transition-colors"
            >
              Serviços
            </Link>
            <Link
              href="/contato"
              className="text-lg text-gray-800 hover:text-blue-600 transition-colors"
            >
              Contato
            </Link>

            {/* Divisor */}
            <div className="w-16 h-px bg-gray-300" />

            {/* Ícones de redes sociais */}
            <div className="flex items-center justify-center gap-6">
              <a
                href="https://wa.me/5548991147704"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-2xl text-gray-700 hover:text-green-600 transition-colors"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://www.instagram.com/ecprojetos_infra"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-2xl text-gray-700 hover:text-pink-600 transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/company/ecprojetos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-2xl text-gray-700 hover:text-blue-700 transition-colors"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        )}
      </MobileNav>
    </Navbar>
  );
}
