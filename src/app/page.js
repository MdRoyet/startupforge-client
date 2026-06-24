import Banner from "@/components/Banner";
import FeaturedOpportunities from "@/components/FeaturedOpportunities";
import FeaturedStartups from "@/components/FeaturedStartups";
import StartupStatistics from "@/components/StartupStatistics";
import SuccessStories from "@/components/SuccessStories";
import Testimonials from "@/components/Testimonials";
import WhyJoinSection from "@/components/WhyJoinSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-base-100">
      {/* 1. The Hero Banner Section */}
      <Banner />

      {/* Future sections we will build next based on your requirements */}

      {/* 2. Dynamic Section 1: Featured Startups */}
      <FeaturedStartups />

      {/* 3. Dynamic Section 2: Featured Opportunities */}
      <FeaturedOpportunities />

      <SuccessStories></SuccessStories>

      <WhyJoinSection></WhyJoinSection>

      <StartupStatistics></StartupStatistics>

      <Testimonials></Testimonials>
    </div>
  );
}
