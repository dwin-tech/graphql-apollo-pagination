import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import HomePage from "./home";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <ApolloProvider client={client}>
          <HomePage />
        </ApolloProvider>
      </main>
    </>
  );
}
