import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getJobById } from '../graphql/query.ts';
import { useState, useEffect } from 'react';

interface Job {
    ID: string;
    TITLE: string;
    DATE: string;
    DESCRIPTION: string;
    COMPANY: { NAME: string, ID: string };
}

export default function JobPage() {
    const { jobId } = useParams<{ jobId: string }>();
    const [job, setJob] = useState<Job | null>(null);

    useEffect(() => {
        getJobById(jobId).then(setJob);
    }, [jobId]);

    if (!job) return <div>Ачааллаж байна...</div>;

    return (
        <div>
            <h1 className='title is-3'>{job.TITLE}</h1>

            <Link to={`/company/${job.COMPANY.ID}`}>
                <h2 className='subtitle is-4'>{job.COMPANY.NAME}</h2>
            </Link>
            <div className='box'>
                <div className='block has-text-gray'>Нийтэлсэн: {job.DATE}</div>
                <div className='block'>{job.DESCRIPTION}</div>
            </div>
        </div>
    );
}
