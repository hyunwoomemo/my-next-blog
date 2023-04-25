import { PROJECT_DATABASE_ID, TOKEN } from "@/config";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import React, { useState } from "react";
import { unified } from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import Layout from "@/components/Layout";

import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import Markdown2Html from "@/components/Markdown2Html";
import ProjectPostList from "@/components/projects/ProjectPostList";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import ProjectMarkdown2Html from "@/components/projects/ProjectMarkdown2Html";
import styled from "@emotion/styled";

const ProjectItem = ({ html_text }) => {
  const [action, setAction] = useState(false);
  return (
    <Layout>
      <ProjectMarkdown2Html html={html_text} />
      <ActionBtn onClick={() => setAction(!action)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path
            fill-rule="evenodd"
            d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z"
            clip-rule="evenodd"
          />
        </svg>
      </ActionBtn>
      <ActionWrapper action={action}>
        <ActionItem>✍🏻 포스트</ActionItem>
        <ActionItem>🏠 홈페이지</ActionItem>
      </ActionWrapper>
    </Layout>
  );
};

const ActionBtn = styled.div`
  width: 50px;
  position: absolute;
  bottom: 50px;
  right: 50px;
  padding: 10px;
  background-color: var(--text-color);
  color: var(--main-background);
  border-radius: 50%;
`;

const ActionWrapper = styled.div`
  color: var(--text-color);
  background-color: var(--main-background);
  position: absolute;
  right: 0;
  padding: 1rem;
  bottom: 120px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  white-space: nowrap;
  margin-bottom: 1rem;
  transform: ${({ action }) => (action ? "scaleY(1)" : "scaleY(0)")};
  transform-origin: bottom;
  transition: all 0.3s;
`;

const ActionItem = styled.div`
  padding: 10px 14px;
  font-size: 20px;
  background-color: var(--text-color);
  color: var(--main-background);
  border-radius: 15px;
  width: 100%;
`;

export default ProjectItem;

export async function getStaticPaths() {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Notion-Version": "2022-06-28",
      "content-type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      sorts: [
        {
          property: "Name",
          direction: "ascending",
        },
      ],
      page_size: 100,
    }),
  };

  const res = await fetch(`https://api.notion.com/v1/databases/${PROJECT_DATABASE_ID}/query`, options);
  const dbs = await res.json();

  const paths = dbs.results.map((db) => ({
    params: { id: db.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Notion-Version": "2022-06-28",
      "content-type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      page_size: 100,
    }),
  };
  const { Client } = require("@notionhq/client");

  const notion = new Client({
    auth: TOKEN,
    notionVersion: "2022-06-28",
  });

  const n2m = new NotionToMarkdown({ notionClient: notion });

  const mdblocks = await n2m.pageToMarkdown(params.id);
  const mdString = n2m.toMarkdownString(mdblocks);

  const html_text = unified()
    .use(markdown)
    .use(remarkGfm)
    .use(require("unified-remark-prismjs"), {
      showLanguage: true, // show language tag
      enableCopy: true,
    })
    .use(remark2rehype)
    .use(html)
    .processSync(mdString).value;

  return {
    props: {
      html_text,
    }, // will be passed to the page component as props
  };
}
