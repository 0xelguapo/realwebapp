import Head from "next/head";
import HomepageLayout from "../shared/components/UI/Layouts/HomepageLayout";
import Image from "next/image";
import Link from "next/link";
import SubscribeInput from "../shared/components/UI/CTA/SubscribeInput";
import CTAButton from "../shared/components/UI/CTA/CTAButton";
import Date from "../shared/lib/date";
import { getSortedPostsData } from "../shared/lib/publications";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <>
      <Head>
        <title>Client Relationship Management | CoAgent</title>
        <meta
          name="description"
          content="Client Relationship Management, made for real estate agents. The best app to use to manage all your clients and prospects"
        />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <div className="flex items-center px-6 py-5 flex-col h-[800px] bg-black md:h-[55rem] md:px-36 md:py-10">
        <div className="flex flex-col px-6 text-stone-200 mb-5 md:pt-6 md:items-center">
          <h1 className="text-4xl font-extrabold text-center leading-tight md:text-left md:text-7xl">
            Made for Agents.
          </h1>
          <p className="text-center mt-2 font-medium mb-8 md:text-2xl">
            Finally, a powerful app to help you manage <br />
            client and prospect relationships
          </p>
          <div className="flex w-full justify-center z-10">
            <CTAButton>Try It Free</CTAButton>
          </div>
          <div className="block h-[700px] md:w-[20vw] md:-mt-12">
            <Image
              src="/homepage/clientDetails.svg"
              layout="responsive"
              width={375}
              height={812}
              alt="news on phone"
            />
          </div>
        </div>
      </div>

      <main className="flex justify-center flex-col">
        <div className="py-[5rem] px-[1rem] md:px-[5rem]">
          <div>
            <h1 className="text-4xl font-extrabold text-center mb-4">
              Easy to Get Started
            </h1>
            <p className="text-center text-xl">
              Using Excel or another CRM? We make it easy to get started.
            </p>
          </div>
          <div className="md:flex md:flex-row">
            <div className="items-center justify-center text-center md:flex md:flex-col md:flex-auto">
              <div className="block md:w-[40vw] px-6 mt-16">
                <Image
                  src="/homepage/uploadClients.png"
                  layout="responsive"
                  width={400}
                  height={250}
                  alt="upload clients with csv"
                />
              </div>
              <h3 className="text-2xl font-bold mt-5">
                Import with a simple drag and drop
              </h3>
              <p className="mt-5">
                Automatically upload all your data simply by drag-and-dropping
                your excel or .csv file
              </p>
            </div>
            <div className="items-center justify-center text-center mt-16 md:flex md:flex-col md:flex-auto">
              <div className="block px-6 md:w-[40vw]">
                <Image
                  src="/homepage/onePlace.png"
                  width={400}
                  height={250}
                  layout="responsive"
                  alt="all your contacts in one place"
                />
              </div>
              <h3 className="text-2xl font-bold mt-5">
                Start building better relationships
              </h3>
              <p className="mt-5">
                Upload once, sync while at your work station and on-the-go with
                our iOS app
              </p>
            </div>
          </div>
        </div>

        <div className="pt-10 bg-black text-stone-200 px-6">
          <h1 className="text-4xl font-extrabold text-center mb-2">
            Stay Productive
          </h1>
          <p className="text-center text-xl mb-8">
            Keep track of your need-to-dos
          </p>
          <div className="flex w-full items-center justify-center mt-5">
            <CTAButton>Try It Free</CTAButton>
          </div>
          <div className="mt-10 md:w-[30vw] md:m-auto md:mt-12">
            <Image
              src="/homepage/focus.png"
              layout="responsive"
              width={375}
              height={419}
              alt="homepage of app"
            />
          </div>
        </div>
      </main>

      {/* <div className="py-10">
        <h2 className="text-center text-3xl font-bold">Recent Blog Posts</h2>
        <div className="flex flex-col flex-wrap py-10 justify-center sm:flex-row">
          {allPostsData.slice(0, 3).map(({ id, title, date }) => (
            <div key={id} className="flex h-96">
              <Link href={`/publications/${id}`}>
                <a className="flex flex-col w-2/3 m-auto h-5/6 min-w-[390px]">
                  <Image
                    src={`/postImages/${id}.jpg`}
                    width={500}
                    height={275}
                    alt={`${id}`}
                    objectFit="cover"
                  />
                  <div className="flex flex-col items-end">
                    <h3 className="font-bold">{title}</h3>
                    <p className="font-light">
                      <Date dateString={date} />
                    </p>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex w-full justify-center">
          <Link href="/publications">
            <a className="text-white bg-black p-2 rounded-lg font-medium text-sm">
              See All Publications
            </a>
          </Link>
        </div>
      </div> */}

      <div className="bg-stone-50 px-[1rem] py-[5rem]">
        <h1 className="text-3xl font-extrabold text-center">
          Curated by Real Estate Agents, for Agents
        </h1>
        <div className="flex w-full items-center justify-center mt-5">
          <CTAButton>Try It Free</CTAButton>
        </div>
      </div>
    </>
  );
}

Home.PageLayout = HomepageLayout;