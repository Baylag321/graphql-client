import { Link } from 'react-router-dom';

interface Job {
  id: string;
  title: string;
  date: string;
  company: { name: string }; // Now a single object, not an array

  // Add other job-related properties here
}

export default function JobItem({ job }: { job: Job }) {
  return (
    <li className="media">
      <div className="media-left has-text-gray">{job.date}</div>
      <div className="media-content">
        <Link to={`/jobs/${job.id}`} className="has-text-gray">
          {`${job.title} - ${job.company.name}`}
        </Link>
      </div>
    </li>
  );
}
