import { useParams } from 'react-router';
import { getCompanyById } from '../graphql/query.ts';
import { useState, useEffect } from 'react';
import JobList from './components/job-list.tsx';

export default function CompanyPage() {
    const { companyId } = useParams<{ companyId: string }>();
    const [state, setState] = useState({
        loading: true,
        error: false,
        errorMessage: null,
        company: null,
    });

    useEffect(() => {
        getCompanyById(companyId).then(data => {
            setState({ company: data, loading: false, error: false, errorMessage: null });
        }).catch(err => {
            setState({
                company: null,
                loading: false,
                error: true,
                errorMessage: err.response.errors[0].message,
            });
        });
    }, [companyId]);

    const { loading, error, company, errorMessage } = state;
    if (loading) return <div>Ачааллаж байна...</div>;
    if (error) return <div className='box has-text-danger'>{errorMessage}! Дахин оролдно уу</div>;

    return <div>
        <h1 className='title'> {company.NAME}</h1>
        <div className='box'> {company.DESCRIPTION}</div>
        <h2 className='title is-5'>Бидний санад болгож буй ажлын байр</h2>
        <JobList jobs={company.JOBS} />
    </div>;
}
