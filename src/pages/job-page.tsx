import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import { deleteJob, getJobById } from '../graphql/query.ts';
import { useState, useEffect } from 'react';

interface Job {
    ID: string;
    TITLE: string;
    DATE: string;
    DESCRIPTION: string;
    COMPANY: { NAME: string, ID: string };
}

interface User {
    companyId: string;
    email: string;
}

interface JobPageProps {
    loggedUser: User | null;
}

export default function JobPage({ loggedUser }: JobPageProps) {
    const { jobId } = useParams<{ jobId: string }>();
    const [job, setJob] = useState<Job | null>(null);
    const [isModalActive, setIsModalActive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getJobById(jobId).then(setJob);
    }, [jobId]);

    if (!job) return <div>Ачааллаж байна...</div>;

    async function handleDelete() {
        const job = await deleteJob(jobId);
        console.log(job);
        navigate('/');
    }

    function triggerModal() {
        setIsModalActive(!isModalActive);
    }

    const modalClass = isModalActive ? 'is-active' : '';

    return (
        <div>
            <div className={`modal ${modalClass}`}>
                <div className='modal-background'></div>
                <div className='modal-card'>
                    <header className='modal-card-head'>
                        <p className='modal-card-title'>Анхаар</p>
                        <button className='delete' aria-label='close' onClick={triggerModal}></button>
                    </header>
                    <section className='modal-card-body'>Зарыг устгах уу?
                    </section>
                    <footer className='modal-card-foot'>
                        <div className='buttons'>
                            <button className='button is-danger' onClick={handleDelete}>Устгах</button>
                            <button className='button' onClick={triggerModal}>Болих</button>
                        </div>
                    </footer>
                </div>
            </div>

            <h1 className='title is-3'>{job.TITLE}</h1>

            <Link to={`/company/${job.COMPANY.ID}`}>
                <h2 className='subtitle is-4'>{job.COMPANY.NAME}</h2>
            </Link>
            <div className='box'>
                <div className='block has-text-gray'>Нийтэлсэн: {job.DATE}</div>
                <div className='block'>{job.DESCRIPTION}</div>
            </div>
            {loggedUser && job.COMPANY.ID === loggedUser.companyId && (
                <>
                    <button className='button is-danger' onClick={triggerModal}>Устгах</button>
                    {' '}
                    <button className='button is-link' onClick={() => navigate(`/jobs/edit/${jobId}`)}>Засах</button>
                </>
            )}
        </div>
    );
}
