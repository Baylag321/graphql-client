import JobItem from './job-item';

export default function JobList({ jobs }: { jobs: Job[] }) {
    return (
        <ul className='box'>
            {jobs.map((job) => (
                <JobItem key={job['ID']} job={job} />
            ))}
        </ul>
    );
}
