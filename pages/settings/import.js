import { useState, useCallback } from "react";
import Head from "next/head";
import DashboardLayout from "../../shared/components/UI/Layouts/DashboardLayout";

function Import() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      Component: (
        <div className="container h-full flex flex-col py-24 px-12 justify-center">
          
          <div className="border basis-1/5">File Div</div>
          <div className="border basis-3/5">Description Div</div>
        </div>
      ),
    },
  ];

  return (
    <div className="container w-full h-screen">
      <Head>
        <title>CoAgent Dashboard | Settings</title>
        <meta
          name="description"
          content="Client Management for Real Estate and Insurance Agents"
        />
        <link rel="icon" href="/icon.svg" />
      </Head>
      {steps[currentStep].Component}
    </div>
  );
}

Import.PageLayout = DashboardLayout;

export default Import;
