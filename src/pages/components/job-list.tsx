import JobItem from './job-item';

type TR_LESSON = {
    ID: number;
    TRN_ID: number;
    FILENAME: string;
    FILECONTENT: string;
    EMP_ID: number;
};

type AiFlightsProps = {
    trn_lessons?: TR_LESSON[];
};

export default function JobList({ trn_lessons = [] }: AiFlightsProps) {
    return (
        <ul className="box">
            {trn_lessons.map((trn_lesson) => (
                <JobItem key={trn_lesson.ID} trn_lesson={trn_lesson} />
            ))}
        </ul>
    );
}
