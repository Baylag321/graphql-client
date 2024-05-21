import React, { useEffect, useState } from 'react';
import { getJobById, updateJob } from '../graphql/query.ts';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditJobPage() {
    const { jobId } = useParams<{ jobId: string }>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getJobById(jobId).then((job) => {
            setTitle(job.TITLE);
            setDescription(job.DESCRIPTION);
        });
    }, [jobId]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const job = await updateJob(jobId, title, description);
        navigate(`/jobs/${job.ID}`);
    };

    return (
        <div>
            <h1 className='title'>Зарыг засварлах</h1>
            <div className='box'>
                <form action=''>
                    <div className='field'>
                        <div className='label'>Зарын гарчиг</div>
                        <div className='control'>
                            <input
                                value={title}
                                type='text'
                                className='input'
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className='field'>
                        <label className='label'>Зарын дэлэгрэнгүй</label>
                        <div className='control'>
                            <textarea
                                value={description}
                                className='textarea'
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                                rows={4}
                            ></textarea>
                        </div>
                    </div>

                    <div className='field'>
                        <div className='control'>
                            <button onClick={() => navigate(`/jobs/${jobId}`)} className='button is-warning'>
                                Буцах
                            </button>
                            {' '}
                            <button onClick={handleSubmit} className='button is-link'>
                                Хадгалах
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
