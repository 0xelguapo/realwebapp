import Head from "next/head";
import HomepageLayout from "../shared/components/UI/Layouts/HomepageLayout";
import Image from "next/image";
import Link from "next/link";
import SubscribeInput from "../shared/components/UI/CTA/SubscribeInput";
import CTAButton from '../shared/components/UI/CTA/CTAButton'
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
      <div className="flex items-center px-4 py-5 flex-col h-[800px] bg-black md:flex-row md:items-start md:px-36 md:py-10 md:justify-center">
        <div className="flex flex-col px-4 text-stone-200 mb-5 md:pt-10">
          <h1 className="text-4xl font-extrabold text-center leading-tight md:text-left">
            Made for Agents.
          </h1>
          <p className="text-center mt-2 font-medium md:text-left">
            Finally, a powerful app to help you manage <br />
            client and prospect relationships
          </p>
          <CTAButton>Try It Free</CTAButton>
        </div>
        <div className="px-4 flex flex-col-reverse h-full">
          <Image
            src="/homepage/clientDetails.svg"
            width={370}
            height={690}
            alt="news on phone"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="py-10">
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
      </div>
      <div className="bg-slate-200 py-10 px-4">
        <h3 className="text-center font-medium text-3xl">About Us</h3>
        <p className="text-center mt-5">
          Curated real estate news, delivered to you weekly. <br />
          We put together the most interesting and actionable stories, all you
          do is enjoy, all for free.{" "}
        </p>
        <div className="flex flex-col h-72 justify-center">
          <h4 className="text-center font-bold text-2xl h-24">
            &quot;Something to talk about with my clients. Keeps myself
            interesting&quot;
          </h4>
          <h4 className="text-center font-bold text-2xl">
            &quot;My favorite is the guest interview sections. &quot;
          </h4>
        </div>
      </div>
    </>
  );
}

Home.PageLayout = HomepageLayout;
