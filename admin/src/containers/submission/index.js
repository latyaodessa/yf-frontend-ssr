import React from 'react'
import PermissionProtectedLayout from '../layouts/PermissionProtectedLayout';
import SubmissonListTable from './components/SubmissonListTable';
import SubmissionDetailsForm from './details/SubmissionDetailsForm';

const Submission = ({match}) => {
    return match.params.userId && match.params.uuid ? <SubmissionDetails/> : <SubmissionList/>;
};


const SubmissionList = () => (<PermissionProtectedLayout>
    <div>
        <h1>Submissions</h1>
        <SubmissonListTable/>
    </div>
</PermissionProtectedLayout>);

const SubmissionDetails = () => (<PermissionProtectedLayout>
    <div>
        <SubmissionDetailsForm/>
    </div>
</PermissionProtectedLayout>);

export default Submission;
