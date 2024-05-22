import React, { useState } from 'react';
import { GET_JOB_BY_ID, UPDATE_JOB } from '../graphql/query.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

interface EditJobPageProps {
    loggedUser: any;
}

// @ts-ignore
export default function EditJobPage({ loggedUser }: EditJobPageProps) {
    const { jobId } = useParams<{ jobId: string }>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const { loading, error } = useQuery(GET_JOB_BY_ID, {
        variables: { jobId },
        onCompleted: (data) => {
            setTitle(data.job.TITLE);
            setDescription(data.job.DESCRIPTION);
        },
    });

    const [mutate] = useMutation(UPDATE_JOB);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const {
            data: { job },
        } = await mutate({
            variables: {
                input: { ID: jobId, TITLE: title, DESCRIPTION: description },
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

    if (loading) return <div>Ачааллаж байна...</div>;
    if (error) return <div>Алдаа: {error.message}</div>;

    return (
        <div>
            <h1 className="title">Зарыг засварлах</h1>
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
                            <button
                                onClick={() => navigate(`/jobs/${jobId}`)}
                                className="button is-warning"
                            >
                                Буцах
                            </button>{' '}
                            <button
                                onClick={handleSubmit}
                                className="button is-link"
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
