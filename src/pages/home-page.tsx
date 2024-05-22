import JobList from './components/job-list';
import { GET_JOBS } from '../graphql/query.ts';
import { useQuery } from '@apollo/client';

export default function HomePage() {
    const { data, loading, error } = useQuery(GET_JOBS, {
        fetchPolicy: 'network-only',
    });

    if (loading) return <div>Ачааллаж байна...</div>;
    if (error) return <div>Алдаа: {error.message}</div>;
    const { jobs } = data;

    return (
        <div>
            <h1 className="title">Ажлын зар</h1>
            <JobList jobs={jobs} />
        </div>
    );
}
