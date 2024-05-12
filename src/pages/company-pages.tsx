import { useParams } from 'react-router';
import { companies } from './lib/data';

export default function CompanyPage() {
  const { companyId } = useParams<{ companyId: string }>();
  const cmp = companies.find((cmp) => cmp.id === companyId);
  return <div>Company : {cmp.name}</div>;
}
