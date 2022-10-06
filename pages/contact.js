import Head from "next/head";
import HomepageLayout from "../shared/components/UI/Layouts/HomepageLayout";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact | CoAgent</title>
        <meta
          name="description"
          content="Contact CoAgent, the number one CRM app for residential and commerical real estate agents"
        />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <div className="flex flex-col items-center justify-center h-[90vh] text-center">
        <div>
          <h1 className="text-5xl font-bold">Need to Contact Us?</h1>
          <p className="text-xl">Or just simply want to chat...</p>
        </div>
        <div className="mt-10">
          <h3 className="text-2xl font-bold">Email Us</h3>
          <p>eric@coagent.co</p>
        </div>
        <div className="mt-10">
          <h3 className="text-2xl font-bold">Facebook</h3>
          <p>CoAgent Facebook</p>
        </div>
      </div>
    </>
  );
}

Contact.PageLayout = HomepageLayout