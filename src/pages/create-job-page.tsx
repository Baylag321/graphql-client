import React, { useState } from 'react';
import { createJob } from '../graphql/query.ts';
import { useNavigate } from 'react-router-dom';

export default function CreateJobPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const job = await createJob(title, description);

        navigate(`/jobs/${job.ID}`);
    };

    return (
        <div>
            <h1 className='title'>Шинээр зар нэмэх</h1>
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
                                rows={10}
                            ></textarea>
                        </div>
                    </div>

                    <div className='field'>
                        <div className='control'>
                            <button
                                onClick={handleSubmit}
                                className='button is-link'
                            >
                                Хадгалах
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
