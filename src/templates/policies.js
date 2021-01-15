import React, { useState } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PoliciesNav from '../components/nav-policies';

function PoliciesPost({ data }) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark;
  const [isExpanded, toggleExpansion] = useState(false);

  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <section className="lg:flex">
        <div className="block lg:hidden p-3 bg-gradient-to-r from-green-400 to-purple-500">
          <button
            className="flex items-center px-3 py-2 bg-white rounded text-black"
            onClick={() => toggleExpansion(!isExpanded)}
          >
            <svg
              className="fill-current h-3 w-3 mr-2"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
            Policies
          </button>
        </div>
        <div
          className={`${
            isExpanded ? `block` : `hidden`
          } bg-white border-b lg:border-b-0 lg:pt-0 lg:w-1/4 lg:block lg:border-0 xl:w-1/5`}
        >
          <div className="scrolling-touch">
            <PoliciesNav />
          </div>
        </div>

        <div className="lg:w-3/4 xl:w-4/5">
          <div className="p-5 pt-8 max-w-3xl">
            <h1 className="text-4xl font-bold font-heading">{frontmatter.title}</h1>
            <div
              className="markdown"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default PoliciesPost;

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        author
      }
    }
  }
`;
