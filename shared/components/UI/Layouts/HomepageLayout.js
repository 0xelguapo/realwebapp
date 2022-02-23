import Navbar from "../Navbar/Navbar";

export default function HomepageLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}