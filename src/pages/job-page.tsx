import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import { DELETE_JOB, GET_JOB_BY_ID } from '../graphql/query.ts';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

interface User {
    companyId: string;
    email: string;
}

interface JobPageProps {
    loggedUser: User | null;
}

export default function JobPage({ loggedUser }: JobPageProps) {
    const { jobId } = useParams<{ jobId: string }>();
    const { data, loading, error } = useQuery(GET_JOB_BY_ID, {
        variables: { jobId },
    });

    const [mutate] = useMutation(DELETE_JOB);

    const [isModalActive, setIsModalActive] = useState(false);
    const navigate = useNavigate();

    if (loading) return <div>Ачааллаж байна...</div>;
    if (error) return <div>Алдаа: {error.message}</div>;
    const { job } = data;

    async function handleDelete() {
        const {
            data: { job },
        } = await mutate({ variables: { id: jobId } });
        console.log('Deleted job', job);
        navigate('/');
    }

    function triggerModal() {
        setIsModalActive(!isModalActive);
    }

    const modalClass = isModalActive ? 'is-active' : '';

    return (
        <div>
            <div className={`modal ${modalClass}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Анхаар</p>
                        <button
                            className="delete"
                            aria-label="close"
                            onClick={triggerModal}
                        ></button>
                    </header>
                    <section className="modal-card-body">
                        Зарыг устгах уу?
                    </section>
                    <footer className="modal-card-foot">
                        <div className="buttons">
                            <button
                                className="button is-danger"
                                onClick={handleDelete}
                            >
                                Устгах
                            </button>
                            <button className="button" onClick={triggerModal}>
                                Болих
                            </button>
                        </div>
                    </footer>
                </div>
            </div>

            <h1 className="title is-3">{job.TITLE}</h1>

            <Link to={`/company/${job.COMPANY.ID}`}>
                <h2 className="subtitle is-4">{job.COMPANY.NAME}</h2>
            </Link>
            <div className="box">
                <div className="block has-text-gray">Нийтэлсэн: {job.DATE}</div>
                <div className="block">{job.DESCRIPTION}</div>
            </div>
            {loggedUser && job.COMPANY.ID === loggedUser.companyId && (
                <>
                    <button className="button is-danger" onClick={triggerModal}>
                        Устгах
                    </button>{' '}
                    <button
                        className="button is-link"
                        onClick={() => navigate(`/jobs/edit/${jobId}`)}
                    >
                        Засах
                    </button>
                </>
            )}
        </div>
    );
}
