import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    ApolloLink,
    concat,
    gql,
} from '@apollo/client';

const httpLink = createHttpLink({ uri: 'http://localhost:9000/graphql' });
const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token');
    if (token) {
        operation.setContext({
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    return forward(operation);
});

export const clientApollo = new ApolloClient({
    link: concat(authLink, httpLink),
    cache: new InMemoryCache(),
});

export const UPDATE_JOB = gql`
    mutation updateJob($input: UpdateJobInput!) {
        job: updateJob(input: $input) {
            ID
            DESCRIPTION
            TITLE
        }
    }
`;

export const DELETE_JOB = gql`
    mutation deleteJob($id: String!) {
        job: deleteJob(id: $id) {
            ID
            DESCRIPTION
            TITLE
        }
    }
`;

const JOB_DETAIL_FRAGMENT = gql`
    fragment JobDetailFragment on Job {
        TITLE
        DESCRIPTION
        DATE
        COMPANY {
            ID
            NAME
        }
    }
`;

export const GET_JOB_BY_ID = gql`
    query getJob($jobId: ID!) {
        job(id: $jobId) {
            ...JobDetailFragment
        }
    }
    ${JOB_DETAIL_FRAGMENT}
`;

export const CREATE_JOB = gql`
    mutation createJob($input: CreateJobInput!) {
        job: createJob(input: $input) {
            ID
            ...JobDetailFragment
        }
    }
    ${JOB_DETAIL_FRAGMENT}
`;

export const GET_COMPANY_BY_ID = gql`
    query getCompany($companyId: ID!) {
        company(ID: $companyId) {
            DESCRIPTION
            NAME
            ID
            JOBS {
                ID
                TITLE
                DESCRIPTION
                DATE
                COMPANY {
                    ID
                    NAME
                }
            }
        }
    }
`;

export const GET_AI_FLIGHTS = gql`
    query Ai_flights {
        ai_flights {
            FLIGHTDATE
            FLIGHT_ID
            NARYAD_ID
        }
    }
`;

export const GET_TRN_LESSONS = gql`
    query Trn_lessons {
        trn_lessons {
            ID
            TRN_ID
            FILENAME
            EMP_ID
        }
    }
`;
