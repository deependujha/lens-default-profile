import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const API_URL = 'https://api.lens.dev';

/* create the API client */
export const client = new ApolloClient({
	uri: API_URL,
	cache: new InMemoryCache(),
});

/* define a GraphQL query  */
export const alpha = gql`
	query DefaultProfile {
		defaultProfile(
			request: { ethereumAddress: "0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3" }
		) {
			id
			name
			bio
			isDefault
			attributes {
				displayType
				traitType
				key
				value
			}
			handle
			picture {
				... on NftImage {
					contractAddress
					tokenId
					uri
					chainId
					verified
				}
				... on MediaSet {
					original {
						url
						mimeType
					}
				}
			}
		}
	}
`;
