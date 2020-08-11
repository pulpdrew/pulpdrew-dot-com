import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pulpdrew's Homepage</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://pulpdrew.com">pulpdrew.com!</a>
        </h1>
      </main>

    </div>
  )
}
