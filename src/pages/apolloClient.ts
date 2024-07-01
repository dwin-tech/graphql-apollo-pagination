// apolloClient.ts

import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'Graphql Uri',
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    pokemons: {
                        keyArgs: ['first', 'after'], // Include 'after' for pagination
                        merge(existing: any[] = [], incoming: any[], { args }) {
                            const { first, after } = args;

                            // Calculate the starting index based on 'after' cursor
                            const startIndex = after ? existing.findIndex(item => item.cursor === after) + 1 : 0;

                            // If startIndex is negative or out of bounds, return incoming as is
                            if (startIndex < 0 || startIndex > existing.length) {
                                return incoming;
                            }

                            // Merge existing and incoming arrays
                            const merged = [...existing.slice(0, startIndex), ...incoming];

                            // Return the merged array limited by 'first'
                            return merged.slice(0, first);
                        },
                        read(existing: any[], { args }) {
                            const { first, after } = args;

                            // Calculate the starting index based on 'after' cursor
                            const startIndex = after ? existing.findIndex(item => item.cursor === after) + 1 : 0;

                            // If startIndex is negative or out of bounds, return existing as is
                            if (startIndex < 0 || startIndex > existing.length) {
                                return existing;
                            }

                            // Return the portion of existing array limited by 'first'
                            return existing.slice(startIndex, startIndex + first);
                        }
                    },
                    pokemonsByType: {
                        keyArgs: ['type']
                    },
                    pokemonsByIds: {
                        keyArgs: ['ids']
                    }
                }
            }
        }
    }),
    ssr: false
});

export default client;
