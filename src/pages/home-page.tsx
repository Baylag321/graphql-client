import { useEffect, useState } from 'react';
import JobList from './components/job-list';
import { getJobs } from '../graphql/query.ts';


export default function HomePage() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        getJobs().then(setJobs);
    }, []);

    return (
        <div>
            <h1 className='title'>Ажлын зар</h1>
            <JobList jobs={jobs} />
        </div>
    );
}
