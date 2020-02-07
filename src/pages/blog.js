import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Img from "gatsby-image"
import Metadata from "../components/metadata"
import Layout from "../components/layout"

import blogStyles from "./blog.module.scss"

const Blog = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
          edges {
            node {
              title
              id
              slug
              publishedDate(formatString: "Do MMMM, YYYY")
              featuredImage {
                fluid(maxWidth: 750) {
                  ...GatsbyContentfulFluid
                }
              }
              excerpt {
                childMarkdownRemark {
                  excerpt(pruneLength: 150)
                }
              }
            }
          }
        }
      }
    `
  )
  return (
    <Layout>
      <Metadata
        title="Blog"
        description="This is where I write about my expertice"
      />
      <ul className={blogStyles.posts}>
        {data.allContentfulBlogPost.edges.map(edge => {
          return (
            <li className={blogStyles.post} key={edge.node.id}>
              <h2>
                <Link to={`/blog/${edge.node.slug}/`}>{edge.node.title}</Link>
              </h2>
              <div className={blogStyles.meta}>
                <span>Posted on {edge.node.publishedDate}</span>
              </div>
              {edge.node.featuredImage && (
                <Img
                  className={blogStyles.featured}
                  fluid={edge.node.featuredImage.fluid}
                  alt={edge.node.title}
                />
              )}
              <p className={blogStyles.excerpt}>
                {edge.node.excerpt.childMarkdownRemark.excerpt}
              </p>
              <div className={blogStyles.button}>
                <Link to={`/blog/${edge.node.slug}/`}>Read More</Link>
              </div>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Blog
