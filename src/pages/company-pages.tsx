import { useParams } from 'react-router';
import { companies } from './lib/data';

interface Company {
    id: string;
    name: string;
}

export default function CompanyPage() {
    const { companyId } = useParams<{ companyId: string }>();
    const cmp = companies.find((cmp: Company) => cmp.id === companyId);
    return <div>Company : {cmp.name}</div>;
}
