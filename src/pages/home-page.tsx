import JobList from './components/job-list';
import { GET_TRN_LESSONS } from '../graphql/query.ts';
import { useQuery } from '@apollo/client';

export default function HomePage() {
    const { data, loading, error } = useQuery(GET_TRN_LESSONS, {
        fetchPolicy: 'network-only',
    });

    if (loading) return <div>Ачааллаж байна...</div>;
    if (error) return <div>Алдаа: {error.message}</div>;
    const { trn_lessons } = data;

    return (
        <div>
            <h1 className="title">Ажлын зар</h1>
            <JobList trn_lessons={trn_lessons} />
        </div>
    );
}
