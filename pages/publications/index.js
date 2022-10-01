import Head from "next/head";
import Image from "next/image";
import Link from 'next/link'
import Navbar from "../../shared/components/UI/Navbar/Navbar";
import Date from "../../shared/lib/date";
import { getSortedPostsData } from "../../shared/lib/publications";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Publications({ allPostsData }) {
  return (
    <>
      <Head>
        <title>All Publications | CoAgent Blog</title>
        <meta
          name="description"
          content="CoAgent blog. Tips, tricks, insights, and news for real estate agents to improve their business."
        />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Navbar />
      <div className="sm:p-10">
        <h1 className="text-4xl font-extrabold text-center">All Posts</h1>
        <div className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center">
          {allPostsData.map(({id, title, date, description, category}) => (
            <div key={id} className="flex flex-col h-35rem sm:w-[450px]">
            <Link href={`/publications/${id}`}>
              <a className="flex flex-col w-2/3 m-auto h-5/6 min-w-[400px]">
                <Image
                  src={`/postImages/${id}.jpg`}
                  width={400}
                  height={350}
                  alt={`${id}`}
                  objectFit="cover"
                />
                <div className="flex flex-col items-end">
                  <p className="self-start py-2 font-medium text-blue-800">{category}</p>
                  <h3 className="font-bold">{title}</h3>
                  <p className="py-2">{description}</p>
                  <p className="font-light">
                    <Date dateString={date} />
                  </p>
                </div>
              </a>
            </Link>
          </div>
          ))}
          </div>
      </div>
    </>
  );
}
