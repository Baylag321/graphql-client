import { Link } from 'react-router-dom';

interface AiFlightsProps {
    ID: number;
    TRN_ID: number;
    FILENAME: string;
}

export default function JobItem({
    trn_lesson,
}: {
    trn_lesson: AiFlightsProps;
}) {
    return (
        <li className="media">
            <div className="media-left has-text-gray">
                {trn_lesson.FILENAME}
            </div>
            <div className="media-content">
                <Link to={`/jobs/${trn_lesson.ID}`} className="has-text-gray">
                    {`${trn_lesson.TRN_ID}`}
                </Link>
            </div>
        </li>
    );
}
