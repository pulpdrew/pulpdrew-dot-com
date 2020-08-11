import Head from 'next/head'

const Home: React.FC<any> = (x) =>  {
  return (
    <div>
      <Head>
        <title>Pulpdrew's Homepage</title>
      </Head>

      <main className="container mx-auto">
        <h1 className="text-center">
          Welcome to <a href="https://pulpdrew.com">pulpdrew.com!</a>
        </h1>
      </main>

    </div>
  )
}

export default Home;
