import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Seo from '@/components/Seo'
import Layout from '@/components/Layout'
import Hero from '@/components/Hero'
import styled from '@emotion/styled'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'
import RollingBanner from '@/components/RollingBanner'
import { CODESNIPET_DATABASE_ID, LANGUAGE_DATABASE_ID, POST_DATABASE_ID, PROJECT_DATABASE_ID, TOKEN } from '@/config'


export default function Home({ posts }) {
  return (
    <Base>
      <Layout posts={posts}>
        <Seo title="home" />
        <Hero />
        {/* <RollingBanner speed={5}>
          {languages.map((v) => {
            return (
              <>
                <Image key={v.id} width={150} height={150} src={v.icon?.file?.url} alt={v.properties.이름.title[0].plain_text}></Image>
              </>
            )
          })}
        </RollingBanner> */}
      </Layout>
    </Base>
  )
}

const Base = styled.div`
`

export async function getStaticProps() {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      page_size: 100,
    }),
  };

  /*   const languageOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        page_size: 100,
      }),
    } */

  const snipetRes = await fetch(`https://api.notion.com/v1/databases/${CODESNIPET_DATABASE_ID}/query`, options);
  const postsRes = await fetch(`https://api.notion.com/v1/databases/${POST_DATABASE_ID}/query`, options);
  const projectRes = await fetch(`https://api.notion.com/v1/databases/${PROJECT_DATABASE_ID}/query`, options);
  /*   const languageRes = await fetch(`https://api.notion.com/v1/databases/${LANGUAGE_DATABASE_ID}/query`, languageOptions)
   */
  const snipetData = await snipetRes.json();
  const postsData = await postsRes.json();
  const projectData = await projectRes.json();
  /*   const languageData = await languageRes.json();
   */
  const posts = [...snipetData.results, ...postsData.results, ...projectData.results];
  /*   const languages = languageData.results;
   */
  return {
    props: { posts },
  };
}


