import { Link } from 'react-router-dom';

interface Job {
    ID: string;
    TITLE: string;
    DATE: string;
    COMPANY: { NAME: string, DESCRIPTION: string };
}

export default function JobItem({ job }: { job: Job }) {
    return (
        <li className='media'>
            <div className='media-left has-text-gray'>{job.DATE}</div>
            <div className='media-content'>
                <Link to={`/jobs/${job.ID}`} className='has-text-gray'>
                    {`${job.TITLE}`}
                </Link>
            </div>
        </li>
    );
}
