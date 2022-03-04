import { useState, useCallback } from "react";
import Head from "next/head";
import DashboardLayout from "../../shared/components/UI/Layouts/DashboardLayout";
import { useDropzone } from "react-dropzone";

function Import() {
  const [currentStep, setCurrentStep] = useState(0);
  const onDrop = useCallback((acceptedFiles) => {
    //do something with files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const steps = [
    {
      Component: (
        <div className="container h-full flex flex-col py-24 px-12 justify-center">
          <div className="flex justify-center items-center border basis-1/5" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop your file here!</p>
            ) : (
              <p className="">Drag and drop your .csv file here</p>
            )}
          </div>
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
