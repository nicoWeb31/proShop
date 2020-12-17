import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keyword }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description}></meta>
            <meta name="keyword" content={keyword} />
        </Helmet>
    );
};

Meta.defaultProps = {
    title: 'PropShop',
    description: 'best ever electronic site',
    keyword: 'electronic',
}

export default Meta;
