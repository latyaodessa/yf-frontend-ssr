import React from 'react'
import PermissionProtectedLayout from '../layouts/PermissionProtectedLayout';
import SubmissonListTable from './components/SubmissonListTable';
import SubmissionDetailsForm from './details/SubmissionDetailsForm';

const Submission = ({match}) => {
    return match.params.userId && match.params.uuid ? <SubmissionDetails userId={match.params.userId} uuid={match.params.uuid}/> : <SubmissionList/>;
};


const SubmissionList = () => (<PermissionProtectedLayout>
    <div>
        <h1>Submissions</h1>
        <SubmissonListTable/>
    </div>
</PermissionProtectedLayout>);

const SubmissionDetails = ({userId, uuid}) => (<PermissionProtectedLayout>
    <div>
        <SubmissionDetailsForm userId={userId} uuid={uuid}/>
    </div>
</PermissionProtectedLayout>);

export default Submission;
