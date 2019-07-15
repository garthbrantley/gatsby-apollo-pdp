import React from "react"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const ProductDetails = ({ data: { pilonProduct: product } }) => (
  <Layout>
    <div className="grid">
      <div className="image-column">
        <Img fluid={product.image.localFile.childImageSharp.fluid} />
      </div>
      <div className="info-column">
        <div className="info">
          <header>
            <h1>{product.name}</h1>
            <span>${parseFloat(product.primaryPrice).toFixed(0)}</span>
          </header>
          <p>{product.longDesc}</p>
        </div>
        <div className="buy">
          <input className="qty" value="1" />
          <a className="add" href="/">
            Add to Bag
          </a>
        </div>
      </div>
    </div>
  </Layout>
)

export default ProductDetails

export const query = graphql`
  query($slug: String!) {
    pilonProduct(slug: { eq: $slug }) {
      slug
      sku
      shortDesc
      longDesc
      name
      primaryPrice
      image {
        localFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
