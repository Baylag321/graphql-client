import { useParams } from 'react-router';
import { getCompanyById } from '../graphql/query.ts';
import { useState, useEffect } from 'react';
import JobList from './components/job-list.tsx';

interface Company {
    ID: string;
    NAME: string;
    DESCRIPTION: string;
    JOBS: { ID: string, TITLE: string, DESCRIPTION: string }[];
}

export default function CompanyPage() {
    const { companyId } = useParams<{ companyId: string }>();
    const [company, setCompany] = useState<Company | null>(null);

    useEffect(() => {
        getCompanyById(companyId).then(setCompany);
    }, [companyId]);

    if (!company) return <div>Ачааллаж байна...</div>;

    return <div>
        <h1 className='title'> {company.NAME}</h1>
        <div className='box'> {company.DESCRIPTION}</div>
        <h2 className='title is-5'>Бидний санад болгож буй ажлын байр</h2>
        <JobList jobs={company.JOBS} />
    </div>;
}
