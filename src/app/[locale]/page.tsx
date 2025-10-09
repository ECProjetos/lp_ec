// app/[locale]/page.tsx
import Hero from "./(marketing)/components/Hero";
import Problem from "./(marketing)/components/Problem";
import Guide from "./(marketing)/components/Guide";
import SocialProof from "./(marketing)/components/SocialProof";
import ActionPlan from "./(marketing)/components/ActionPlan";
import About from "./(marketing)/components/About";
import FinalCTA from "./(marketing)/components/FinalCTA";
import { NavbarDemo } from "./(marketing)/components/Navbar";

export default function Page() {
  return (
    <main>
      <NavbarDemo />
      <Hero />
      <Problem />
      <Guide />
      <SocialProof />
      <ActionPlan />
      <About />
      <FinalCTA />
    </main>
  );
}
  