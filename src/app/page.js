import Banner from "@/components/Banner";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-base-100">
      {/* 1. The Hero Banner Section */}
      <Banner />

      {/* Future sections we will build next based on your requirements */}

      {/* 2. Dynamic Section 1: Featured Startups */}
      {/* <FeaturedStartups /> */}

      {/* 3. Dynamic Section 2: Featured Opportunities */}
      {/* <FeaturedOpportunities /> */}

      {/* 4. Additional Section 1: Success Stories or Stats */}
      {/* <SuccessStories /> */}

      {/* 5. Additional Section 2: Why Join Us */}
      {/* <WhyJoin /> */}
    </div>
  );
}
