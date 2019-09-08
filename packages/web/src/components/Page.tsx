import * as React from 'react';
import styled, { css } from 'styled-components';

interface PageWrapperProps {
  center: boolean;
}

const PageWrapper = styled.section<PageWrapperProps>`
  padding: ${p => p.theme.page.padding};
  display: flex;
  flex-direction: column;

  ${p =>
    p.center &&
    css`
      height: 100vh;
      justify-content: center;
    `}
`;

const PageTitleWrapper = styled.div`
  margin-bottom: 20px;
  padding-top: 15px;
`;

interface TitleProps {
  large: boolean;
}

const Title = styled.h1<TitleProps>`
  font-size: 2rem;
  font-weight: 700;
  transition: ${p => p.theme.transition};
`;

const SubTitle = styled.p`
  font-size: 1rem;
`;

interface PageTitleProps {
  title: string;
  large?: boolean;
  subTitle?: string;
}

export const PageTitle = ({
  title,
  large = false,
  subTitle
}: PageTitleProps) => (
  <PageTitleWrapper>
    <Title large={large}>{title}</Title>
    {subTitle && <SubTitle>{subTitle}</SubTitle>}
  </PageTitleWrapper>
);

interface PageProps {
  title: string;
  children: React.ReactNode | React.ReactNode[];
  largeTitle?: boolean;
  subTitle?: string;
  center?: boolean;
}

export const Page = ({
  title,
  children,
  subTitle,
  largeTitle = false,
  center = false
}: PageProps) => (
  <PageWrapper center={center}>
    <PageTitle title={title} large={largeTitle} subTitle={subTitle} />
    {children}
  </PageWrapper>
);
