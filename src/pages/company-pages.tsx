import { useParams } from 'react-router';
import { GET_COMPANY_BY_ID } from '../graphql/query.ts';
import JobList from './components/job-list.tsx';
import { useQuery } from '@apollo/client';

export default function CompanyPage() {
    const { companyId } = useParams<{ companyId: string }>();
    const { data, loading, error } = useQuery(GET_COMPANY_BY_ID, {
        variables: { companyId },
    });

    if (loading) return <div>Ачааллаж байна...</div>;
    if (error)
        return (
            <div className="box has-text-danger">
                {error.message}! Дахин оролдно уу
            </div>
        );

    const { company } = data;

    return (
        <div>
            <h1 className="title"> {company.NAME}</h1>
            <div className="box"> {company.DESCRIPTION}</div>
            <h2 className="title is-5">Бидний санад болгож буй ажлын байр</h2>
            <JobList jobs={company.JOBS} />
        </div>
    );
}
