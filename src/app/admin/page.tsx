import React from 'react';
import Header from '../shared/Header';
import CourseComponent from './components/CourseComponent/CourseComponent';

const page = () => {
    return (
        <div>
            <Header user="Admin" />
            <CourseComponent />
        </div>
    );
};

export default page;