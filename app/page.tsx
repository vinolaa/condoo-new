import Hero from "@/components/landing/Hero";
import FeaturesSection from "@/components/landing/Features";
import CallToAction from "@/components/landing/CTA";
import FaqSection from "@/components/landing/FAQ";

export const metadata = {
    title: "GC - Página Principal",
    description: "Página Principal.",
};

export default async function Home() {
    return (
        <>
            <Hero />
            <FeaturesSection />
            <CallToAction />
            <FaqSection/>
        </>

    );
}
