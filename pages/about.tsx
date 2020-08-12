import Head from "next/head";
import Nav, { NavItem } from "../components/nav";

const About: React.FC<any> = () => {
  return (
    <div>
      <Head>
        <title>About</title>
      </Head>

      <Nav selected={NavItem.ABOUT}></Nav>

      <main className="container mx-auto flex flex-col items-center space-y-10">
        <img src="/avatar.jpg" alt="profile photo" className="h-48 w-48 rounded-full"/>
        <p className="max-w-3xl text-center">Andrew is a graduating senior studying Computer Science and Engineering at The Ohio State University. He is enthusiastic about open source software and loves to read science fiction and popular science.</p>
      </main>
    </div>
  );
};
export default About;