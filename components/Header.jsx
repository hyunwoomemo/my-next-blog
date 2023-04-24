import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import Link from "next/link";
import ThemeContext from "@/context/ThemeContext";
import { useRouter } from "next/router";
import BackArrow from "@/public/back-arrow.svg";
import ChoiceCategory from "./blog/ChoiceCategory";
import Search from "./Search";
import SearchContext from "@/context/SearchContext";
import { CiSun } from "react-icons/ci";
import { BsMoonFill, BsFillSunFill } from "react-icons/bs";

const Header = ({ data, choiceCt, posts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { themeMode, setThemeMode } = useContext(ThemeContext);

  const [isCSR, setIsCSR] = useState(false);
  useEffect(() => {
    setIsCSR(true);
    setThemeMode(window.localStorage.getItem("theme"));
  }, []);

  const title = data?.filter((v) => v.id === router.query.id)[0]?.properties.Name.title[0].plain_text;

  const [scrollTop, setScrollTop] = useState(0);
  useEffect(() => {
    if (typeof window === undefined) {
      return;
    }

    window.addEventListener("scroll", () => {
      setScrollTop(document.documentElement.scrollTop);
    });
  }, []);

  useEffect(() => {
    if (typeof window === "object") {
      document.body.dataset.theme = themeMode;
      window.localStorage.setItem("theme", themeMode);
    }
  }, [themeMode, isCSR]);

  const handleTheme = () => {
    window.localStorage.setItem("theme", themeMode === "dark" ? "light" : "dark");
    setThemeMode(themeMode === "dark" ? "light" : "dark");
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const { search, setSearch } = useContext(SearchContext);

  return (
    <Base>
      <Wrapper>
        {router.pathname !== "/" ? (
          <BackIcon onClick={() => window.history.back()}>
            <BackArrow width={20} />
          </BackIcon>
        ) : undefined}
        {title && scrollTop > 170 ? <Title onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{title}</Title> : <TitleLink href="/">Hyunwoomemo</TitleLink>}
        <LinkWrapper>
          <Link href="/">홈</Link>
          <Link href="/blog">블로그</Link>
          <Link href="/projects">프로젝트</Link>
          <Link href="/about">About</Link>
        </LinkWrapper>
        <Hambuger onClick={() => setIsOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path
              fillRule="evenodd"
              d="M3 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 5.25zm0 4.5A.75.75 0 013.75 9h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 9.75zm0 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </Hambuger>
        {router.pathname === "/" ? (
          <SearchBtn onClick={() => setSearch(!search)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </SearchBtn>
        ) : undefined}
      </Wrapper>
      {router.pathname.indexOf("posts") > -1 && !router.query.id && router.pathname !== "/blog/posts/categories" ? <ChoiceCategory category={choiceCt} /> : undefined}
      <Modal isOpen={isOpen} onClose={handleClose} position="right">
        <ModalBody>
          <Link href="/">홈</Link>
          <Link href="/blog">블로그</Link>
          <Link href="/projects">프로젝트</Link>
          <Link href="/about">About</Link>
          <ToggleBtn dark={themeMode === "dark"} onClick={handleTheme}>
            {themeMode === "dark" ? <BsMoonFill /> : <BsFillSunFill />}
          </ToggleBtn>
        </ModalBody>
      </Modal>
      <Search active={search} posts={posts} />
    </Base>
  );
};

const Base = styled.header`
  position: sticky;
  padding: 1rem 2rem;
  top: 0;
  left: 0;
  right: 0;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  background-color: var(--main-background);
  z-index: 2;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const BackIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  > svg {
    path {
      fill: var(--text-color);
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const Title = styled.h1`
  margin-right: auto;
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const TitleLink = styled(Link)`
  margin-right: auto;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const LinkWrapper = styled.ul`
  display: flex;
  gap: 1rem;
  color: slategray;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Hambuger = styled.div`
  height: 100%;
  width: 30px;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const ToggleBtn = styled.div`
  width: 24px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 50px;

  color: ${({ dark }) => (dark ? "yellow" : "orange")};

  > svg {
    width: 100%;
    font-size: 36px;
  }
`;

const SearchBtn = styled.div`
  svg {
    width: 24px;
  }
`;

const ModalBody = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default Header;
