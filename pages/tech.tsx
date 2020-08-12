import Head from "next/head";
import Nav, { NavItem } from "../components/nav";

const Tech: React.FC<any> = () => {
  return (
    <div>
      <Head>
        <title>Tech</title>
      </Head>

      <Nav selected={NavItem.TECH}></Nav>

      <main className="container mx-auto flex flex-col items-center space-y-10">
        <p className="text-center">Coming Soon</p>
      </main>
    </div>
  );
};
export default Tech;