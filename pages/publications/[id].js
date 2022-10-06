import Head from "next/head";
import Image from "next/image";
import { getAllPostsIds, getPostData } from "../../shared/lib/publications";
import Date from "../../shared/lib/date";
import Navbar from "../../shared/components/UI/Navbar/Navbar";
import md from "markdown-it";
// import SubscribeInput from "../../shared/components/UI/SubscribeInput";

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostsIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Publication({ postData }) {
  return (
    <>
      <Navbar blog={true} />
      <Head>
        <title>{postData.frontMatter.title}</title>
        <meta name="description" content={postData.frontMatter.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="bg-bridal py-5">
        <article className="prose px-5 m-auto pb-5 text-lg sm:w-2/4">
          <h1 className="text-5xl mb-4 text-center leading-tight">
            {postData.frontMatter.title}
          </h1>
          <div className="text-center text-sm">
            <Date dateString={postData.frontMatter.date} />
          </div>
          <br />
          <Image
            src={`/postImages/${postData.id}.jpg`}
            width={775}
            height={400}
            objectFit="cover"
            alt={`${postData.frontMatter.title}`}
          />
          <div
            dangerouslySetInnerHTML={{ __html: md().render(postData.content) }}
            className="text-lg leading-8"
          />

          {/* <Link href="/publications">
            <div className={styles.back}>
              <a>Back to publications</a>
            </div>
          </Link> */}
        </article>
        <div className="py-10 px-10 bg-neutral-50 mt">
          <p className="text-2xl font-medium text-center pb-5">
            Get Smarter in Real Estate, with Bite-Sized emails
          </p>
          {/* <div className="w-2/4 m-auto">
            <SubscribeInput focus={false} />
          </div> */}
        </div>
      </div>
    </>
  );
}
