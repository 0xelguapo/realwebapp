import { useState, useCallback } from "react";
import Head from "next/head";
import Image from "next/image";
import DashboardLayout from "../../shared/components/UI/Layouts/DashboardLayout";
import { useDropzone } from "react-dropzone";

function Import() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState();

  const onDrop = useCallback((acceptedFile) => {
    setSelectedFile(acceptedFile);
    console.log(acceptedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const steps = [
    {
      Component: (
        <div className="container h-full flex flex-col py-24 px-12 justify-center">
          <div
            className="flex justify-center items-center border-2 border-dashed border-lightgray-500 border-radius basis-1/5"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop your file here!</p>
            ) : (
              <>
                {selectedFile ? (
                  <div className="flex items-center">
                    <Image
                      src="/fileSelected.svg"
                      width={40}
                      height={40}
                      alt="file"
                    />
                    <p className="text-lg font-bold">{selectedFile[0].name}</p>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Image src="/file.svg" width={40} height={40} alt="file" />
                    <p className="">Drag and drop your .csv file here</p>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="basis-3/5 py-8 px-6">Description Div</div>
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
