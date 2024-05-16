import JobList from './components/job-list';
import { jobs } from './lib/data';

export default function HomePage() {
    return (
        <div>
            <h1 className="title">Ажлын зар</h1>
            <JobList jobs={jobs} />
        </div>
    );
}
