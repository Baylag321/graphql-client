import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_JOB, GET_JOB_BY_ID } from '../graphql/query.ts';

export default function CreateJobPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const [mutate, result] = useMutation(CREATE_JOB);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const {
            data: { job },
        } = await mutate({
            variables: {
                input: { TITLE: title, DESCRIPTION: description },
            },
            update: (cache, { data }) => {
                cache.writeQuery({
                    query: GET_JOB_BY_ID,
                    data,
                    variables: { jobId: data.job.ID },
                }); // Update cache
            },
        });

        navigate(`/jobs/${job.ID}`);
    };

    if (result.error) return <div>Алдаа: {result.error.message}</div>;

    return (
        <div>
            <h1 className="title">Шинээр зар нэмэх</h1>
            <div className="box">
                <form action="">
                    <div className="field">
                        <div className="label">Зарын гарчиг</div>
                        <div className="control">
                            <input
                                value={title}
                                type="text"
                                className="input"
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Зарын дэлэгрэнгүй</label>
                        <div className="control">
                            <textarea
                                value={description}
                                className="textarea"
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                                rows={4}
                            ></textarea>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            {result.loading && <div>Түр хүлээнэ үү</div>}
                            <button
                                onClick={handleSubmit}
                                className="button is-link"
                                disabled={result.loading}
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
