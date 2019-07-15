# PDP Example w/ Static & Dynamic Data

Example product details page (PDP) using static and dynamic data with GatsbyJS and Apollo Client

## How to re-create this project

### 1. New GatsbyJS project

```
npm install -g gatsby-cli
gatsby new gatsby-apollo-pdp
cd gatsby-apollo-pdp
git remote add origin ...
git push -u origin master
```

### 2. Add products listing from Pilon API

#### Install Pilon source plugin
```
yarn add gatsby-source-pilon
```

#### Add to gatsby-config.js
```json
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
```html
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

### 4. Add product details page (PDP) for products
