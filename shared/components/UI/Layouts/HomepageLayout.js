import Navbar from "../Navbar/Navbar";
import Link from "next/link";

export default function HomepageLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{" "}
          <Link href="/">
            <a className="hover:underline">CoAgent™</a>
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 md:ml-5">
          <li>
            <Link href="/publications">
              <a className="mr-4 hover:underline md:mr-6 ">Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/privacy-policy">
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a className="mr-4 hover:underline md:mr-6 ">Contact</a>
            </Link>
          </li>
        </ul>
      </footer>
    </>
  );
}
