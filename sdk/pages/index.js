import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import bunzz from "bunzz-sdk";
import { Contract } from "bunzz-sdk";
import env from "../env.json";

const DAPP_ID = env.DAPP_ID;
const API_KEY = env.API_KEY;

const init = async () => {
  const handler = await bunzz.initializeHandler({
    dappId: DAPP_ID,
    apiKey: API_KEY,
  });
  return handler;
};

export default function Home() {
  const [contract, setContract] = useState();
  const [value, setValue] = useState(0);
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    const setup = async () => {
      try {
        const handler = await init();

        const userAddress = await handler.getSignerAddress();
        const contract = await handler.getContract("Token (ERC20)");

        setUserAddress(userAddress);
        setContract(contract);
      } catch (error) {
        console.error(error);
      }
    };

    setup();
  }, []);

  const handleChange = (e) => setValue(e.target.value);

  const submit = async () => {
    await contract.mint(userAddress, value);
    alert("Minting initiated and transaction was successful!");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Juju Metaverse</title>
        <meta name="description" content="Truly African!" />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>

      <div className={styles.header}>
        <h1 className={styles.h}>JujuCoin</h1>
        <input value={value} onChange={handleChange} type="text" />
        <button className={styles.button} onClick={submit}>
          Join Us
        </button>
      </div>

      <main className={styles.main}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: 0.8,
              opacity: 0,
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.4,
              },
            },
          }}
        >
          <h1 className={styles.title}>
            Welcome to <a href="#">JujuCoin!</a>
          </h1>
        </motion.div>

        <p className={styles.description}>
          <code className={styles.code}>
            A river that forgets its source would soon dry up!
          </code>{" "}
          <em>- an African adage.</em>
        </p>

        <p>
          JujuCoin is the native and community token for the Juju Metaverse - a
          truly African Metaverse that focuses on promoting and celebrating the
          African cultures and roots.
        </p>

        <div className={styles.grid}>
          <div className={styles.road}>Our Roadmap</div>
          <a href="#" className={styles.card}>
            <h2>Q4 2021 &rarr;</h2>
            <p>
              <li>Idealization</li>
              <li>Team Assembly</li>
              <li>Whitepaper</li>
              <li>Website</li>
              <li>Communities and Social Media Presence</li>
            </p>
          </a>

          <a href="#" className={styles.card}>
            <h2>Q2 2022 &rarr;</h2>
            <p>
              <li>Tokenizaation</li>
              <li>Security and Auditing</li>
              <li>Initial Coin Offering (ICO)</li>
              <li>DEX Listing</li>
              <li>Partnerships</li>
            </p>
          </a>

          <a href="#" className={styles.card}>
            <h2>Q3 2022 &rarr;</h2>
            <p>
              <li>NFT Minting</li>
              <li>NFT DAO Governance</li>
              <li>Local Partnerships</li>
              <li>Arts & NFT Marketplace</li>
              <li>African Fashion Marketplace</li>
              <li>Communities and Social Charities</li>
            </p>
          </a>

          <a href="#" className={styles.card}>
            <h2>Q4 2022 &rarr;</h2>
            <p>
              <li>DAO Growth and Restructuring</li>
              <li>NGO Partnerships</li>
              <li>Partnerships</li>
              <li>African Food Produce Marketplace</li>
              <li>More Growth</li>
              <li>Roadmap V2</li>
            </p>
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://discordapp.com/users/#8825/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with 💖 by D. C.#8825
        </a>

        <a
          href="https://app.bunzz.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <span className={styles.logo}>
            <Image
              src="/favicon/bunzz.jpg"
              alt="Vercel Logo"
              width={72}
              height={16}
            />
          </span>
        </a>
      </footer>
    </div>
  );
}
