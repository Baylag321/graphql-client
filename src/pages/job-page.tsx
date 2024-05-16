import { useParams } from 'react-router';
import { jobs } from '../pages/lib/data';
import { Link } from 'react-router-dom';

interface Job {
    id: string;
    title: string;
    company: string;
}

export default function JobPage() {
    const { jobId } = useParams<{ jobId: string }>();
    const job = jobs.find((job: Job) => job.id === jobId);

    if (!job) {
        return <div>Job not found</div>;
    }

    return (
        <div>
            <h1 className="title is-3">{job.title}</h1>

            <Link to={`/company/${job.company.id}`}>
                <h2 className="subtitle is-4">{job.company.name}</h2>
            </Link>
            <div className="box">
                <div className="block has-text-gray">Нийтэлсэн: {job.date}</div>
                <div className="block">{job.description}</div>
            </div>
        </div>
    );
}
