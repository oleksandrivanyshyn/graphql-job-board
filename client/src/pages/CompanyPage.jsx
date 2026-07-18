import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getCompany } from '../lib/graphql/queries.js';
import JobList from '../components/JobList.jsx';

function CompanyPage() {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  useEffect(() => {
    getCompany(companyId).then(setCompany);
  }, [companyId]);
  if (!company) return <div>Loading...</div>;
  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h2 className="title is-5">Jobs at {company.name}</h2>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyPage;
