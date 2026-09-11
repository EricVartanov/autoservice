import {GraphQLClient} from 'graphql-request';

export function getGraphqlUrl() {
    return process.env.WORDPRESS_GRAPHQL_URL || '';
}

export function createWpClient() {
    const url = getGraphqlUrl();
    if (!url) return null;
    return new GraphQLClient(url, {
        fetch: (input, init) => fetch(input, {...init, cache: 'no-store'}),
    });
}

export async function wpRequest(document, variables) {
    const client = createWpClient();
    if (!client) {
        throw new Error('WORDPRESS_GRAPHQL_URL is not set');
    }
    return client.request(document, variables);
}
