import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient('http://localhost:9000/graphql');

export async function getCompanyById(companyId) {
    const query = gql`
        query getCompany($companyId: ID!) {
            company(id: $companyId) {
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

    const { company } = await client.request(query, { companyId });
    return company;
}

export async function getJobById(jobId) {
    const query = gql`
        query getJob($jobId: ID!) {
            job(id: $jobId) {
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
    `;

    const { job } = await client.request(query, { jobId });
    return job;
}

export async function getJobs() {
    const query = gql`
        query getJobs {
            jobs {
                ID
                TITLE
                DESCRIPTION
                DATE
                COMPANY {
                    NAME
                    DESCRIPTION
                }
            }
        }
    `;


    const { jobs } = await client.request(query);
    return jobs;
}