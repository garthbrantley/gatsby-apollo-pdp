# PDP Example w/ Static & Dynamic Data

Example product details page (PDP) using static and dynamic data with GatsbyJS and Apollo Client

## How to re-create this project

### 1. New GatsbyJS project

```bash
npm install -g gatsby-cli
gatsby new gatsby-apollo-pdp
cd gatsby-apollo-pdp
git remote add origin ...
git push -u origin master
```

### 2. Add products listing from Pilon API

#### Install Pilon source plugin

```bash
yarn add gatsby-source-pilon
```

#### Add to gatsby-config.js

```javascript
    {
      resolve: 'gatsby-source-pilon',
      options: {
        environmentId: 'f0ae3074-0abc-11e9-ac24-75bf70175027',
      },
    },
```

#### GraphQL query

```javascript
export const query = graphql`
  query ProductsQuery {
    allPilonProduct {
      edges {
        node {
          id
          sku
          name
          slug
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
          additionalImages {
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
      }
    }
  }
`
```

#### JSX in index.js

```JSX
import Img from "gatsby-image"
import { graphql } from "gatsby"

    <div className="product-grid">
      {data.allPilonProduct.edges.map((edge, index) => {
        const product = edge.node
        return (
          <div className="product-block" key={product.sku}>
            <Link key={product.sku} to={`/products${product.slug}`}>
              {product.image && (
                <Img fluid={product.image.localFile.childImageSharp.fluid} />
              )}
            </Link>
            <h2>
              <Link key={product.sku} to={`/products${product.slug}`}>
                {product.name}
              </Link>
            </h2>
            <p>${parseFloat(product.primaryPrice).toFixed(0)}</p>
          </div>
        )
      })}
    </div>
```

### 3. Add some styling

#### Install styled components

```bash
yarn add gatsby-plugin-styled-components styled-components
```

##### gatsby-config.js

```javascript
    `gatsby-plugin-styled-components`,
```

#### Wrap products grid and style it

```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 5vw;
  @media (min-width: 768px) {
    margin: 0 40px;
  }
  margin: 0 0;
}

.product-block {
  margin: 0 0 60px;

  @media (min-width: 768px) {
    grid-column: span 6 / auto;
  }
  @media (min-width: 1024px) {
    grid-column: span 4 / auto;
  }
  grid-column: span 12 / auto;
  text-align: center;

  h2 {
    margin: 36px 0 12px 0;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }

  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.38;
    color: #929292;
  }

  a,
  a:link,
  a:visited {
    font-size: 12px;
    line-height: 1.4;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    color: #000;
    text-decoration: none;

    svg {
      margin-left: 12px;
      stroke: #000;
      width: 60px;
    }
  }
}
```

### 4. Add product details page (PDP) for products

#### Add PDP page template

```JSX
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
          <p>{product.shortDesc}</p>
        </div>
        <div className="buy">
          <input className="qty" value="1" readOnly />
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
      id
      pilonId
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
```

#### Add this gatsby-node.js

```javascript
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allPilonProduct {
        edges {
          node {
            sku
            name
            slug
            shortDesc
            longDesc
            image {
              id
              contentUrl
              localFile {
                childImageSharp {
                  fluid {
                    src
                    srcSet
                    aspectRatio
                    srcSet
                    aspectRatio
                  }
                }
              }
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    result.data.allPilonProduct.edges.forEach(({ node }) => {
      createPage({
        path: `products${node.slug}`,
        context: {
          slug: node.slug,
        },
        component: path.resolve(`./src/templates/productDetails.js`),
      })
    })
  })
}
```

### 5. Add some styling

#### Wrap template content and style it

```css
padding: 180px 0;

.grid {
  display: grid;
  grid-column-gap: 1.5vw;
  grid-template-columns:
    [start] minmax(9%, 1fr) repeat(12, [col-start] minmax(0px, 70px) [col-end])
    minmax(9%, 1fr) [end];
}

.image-column {
  grid-column: start / 6 col-end;
}

.info-column {
  grid-column: 8 col-start / 12 col-end;

  .info {
    border-bottom: 1px solid #000;

    header {
      margin: 36px 0 12px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;

      h1 {
        font-size: 24px;
        font-weight: 400;
        letter-spacing: 0.6px;
        margin: 0;
        text-transform: uppercase;
      }

      span {
        margin: 0;
        font-size: 24px;
        font-weight: 400;
        letter-spacing: 0.6px;
      }
    }

    p {
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0.4px;
      line-height: 1.38;
    }
  }

  .buy {
    display: flex;
    justify-content: space-between;
    margin-top: 2em;

    .qty {
      width: 36%;
    }
    .add {
      width: 56%;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 10px;
      font-weight: 900;
      letter-spacing: 0.3px;
      line-height: 1;
      text-transform: uppercase;
      text-decoration: none;
      background-color: #452946;
      color: #fff;
      :hover {
        border-color: #000;
        background-color: #000;
      }
    }
  }
}
```

### 6. Pull in product price dynamically

#### Install Apollo client

```bash
yarn add apollo-boost react-apollo graphql apollo-link-context

```

#### Create a client.js file

```javascript
import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import { InMemoryCache } from "apollo-cache-inmemory"
import fetch from "isomorphic-fetch"

const getCustomerSessionId = async environmentId =>
  await fetch("https://api.pilon.io/customer-sessions", {
    method: "post",
    body: JSON.stringify({
      environment: `/environments/${environmentId}`,
    }),
    headers: {
      "Content-Type": `application/json`,
      Accept: `application/json`,
    },
  })
    .then(res => res.json())
    .then(json => json.id)

const httpLink = createHttpLink({
  uri: "https://api.pilon.io/graphql",
})

const authLink = setContext(async (_, { headers }) => {
  const customerSessionId = await getCustomerSessionId(
    "f0ae3074-0abc-11e9-ac24-75bf70175027"
  )
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: customerSessionId
        ? `CUSTOMER-SESSION-ID ${customerSessionId}`
        : "",
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  fetch,
})

export default client
```

#### Setup ApolloProvider in gatsby-browser and gatsby-ssr

```javascript
import React from "react"
import { ApolloProvider } from "react-apollo"
import client from "./src/apollo/client"

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)
```

#### Now modify product page template to update price dynamically

```JSX
import { Query } from "react-apollo"
import gql from "graphql-tag"

...

const APOLLO_QUERY = gql`
  query($id: ID!) {
    product(id: $id) {
      primaryPrice
    }
  }
`

...

  <Query query={APOLLO_QUERY} variables={{ id: product.pilonId }}>
    {({ data, loading, error }) => {
      let curPrice = product.primaryPrice
      if (!loading && !error) {
        curPrice = data.product.primaryPrice
      }

      return <span>${parseFloat(curPrice).toFixed(0)}</span>
    }}
  </Query>
```

#### Update a product price

Edit "Lipstick" here - https://app.pilon.io/product/ce6ecd1a-0abd-11e9-8761-b334f962f19a/

### 7. Bonus - Use React hooks with Apollo client library

```bash
yarn add @apollo/react-hooks
```

#### In gatsby-ssr.js and gatsby-browser.js

```javascript
import { ApolloProvider } from "@apollo/react-hooks"
```

#### In product page template

```javascript
import { useQuery } from '@apollo/react-hooks';

...

  const { loading, error, data } = useQuery(APOLLO_QUERY)
  let curPrice = product.primaryPrice
  if (!loading && !error) {
    curPrice = data.product.primaryPrice
  }
```
