import React from 'react';
import PropTypes from 'prop-types';
import {useRouter} from "next/router";

Slug.propTypes = {

};

function Slug(props: any) {

    const router = useRouter();

    const slug = router.query.slug;

    return(
    <div>
        <h1>{slug}</h1>
    </div>
);
}

export default Slug;