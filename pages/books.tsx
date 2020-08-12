import Head from "next/head";
import Nav, { NavItem } from "../components/nav";

const Books: React.FC<any> = () => {
  return (
    <div>
      <Head>
        <title>Books</title>
      </Head>

      <Nav selected={NavItem.BOOKS}></Nav>

      <main className="container mx-auto flex flex-col items-center space-y-10">
        <p className="text-center">Coming Soon</p>
      </main>
    </div>
  );
};
export default Books;