import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Img from "gatsby-image"

import postStyles from "./blogPost.module.scss"
import Metadata from "../components/metadata"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedDate(formatString: "Do MMMM, YYYY")
      featuredImage {
        fluid(maxWidth: 750) {
          ...GatsbyContentfulFluid
        }
      }
      body {
        json
      }
    }
  }
`

const BlogPost = props => {
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img alt={alt} src={url} />
      },
    },
  }

  return (
    <Layout>
      <Metadata title={props.data.contentfulBlogPost.title} />
      <div className={postStyles.content}>
        <h1>{props.data.contentfulBlogPost.title}</h1>
        <span className={postStyles.meta}>
          Posted on {props.data.contentfulBlogPost.publishedDate}
        </span>

        {props.data.contentfulBlogPost.featuredImage && (
          <Img
            className={postStyles.featured}
            fluid={props.data.contentfulBlogPost.featuredImage.fluid}
            alt={props.data.contentfulBlogPost.title}
          />
        )}

        {documentToReactComponents(
          props.data.contentfulBlogPost.body.json,
          options
        )}
      </div>
    </Layout>
  )
}

export default BlogPost
