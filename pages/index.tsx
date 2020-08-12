import Head from 'next/head'
import Nav, { NavItem } from '../components/nav';
import PostSummary from '../components/post-summary';
import Post from '../types/post';

const Home: React.FC<any> = (x) =>  {

  const post: Post = {
    title: 'RLox',
    date: new Date(),
    slug: 'rlox',
    html: '',
    summary: 'Lox is a programming language designed by Bob Nystrom for use in his excellent book, "Crafting Interpreters." Nystrom walks readers through building two Lox interpreters - a Tree-Walk interpreter written in Java and a Single Pass Bytecode Compiler + Stack-based VM written in C. After working my way through the book, I decided to implement a third version of the interpreter in Rust.',
  }

  return (
    <div>
      <Head>
        <title>Pulpdrew</title>
      </Head>

      <Nav selected={NavItem.MAIN}></Nav>

      <main className="sm:container mx-auto mt-10">

        <PostSummary post={post}></PostSummary>
        <PostSummary post={post}></PostSummary>
        <PostSummary post={post}></PostSummary>

      </main>

    </div>
  )
}

export default Home;
