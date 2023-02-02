import React from 'react';
import PropTypes from 'prop-types';
import {useRouter} from "next/router";
import {PrismaClient} from "@prisma/client";
import {router} from "next/client";
import {redirect} from "next/navigation";

export async function getServerSideProps(context: any) {
    const slug = context.params.slug;
    const prisma = new PrismaClient();
    const page = await prisma.page.findUnique({
        where: {
            slug: slug
        }
    });
    console.log(page)
    if(!page) {
        return{
            redirect: {
                destination: '/404',
                permanent: false,
            }
        }
    }
    const settings = await prisma.settings.findMany();
    return {
        props: {
            page: JSON.parse(JSON.stringify(page)),
            settings: JSON.parse(JSON.stringify(settings))
        }
    }

}

Slug.propTypes = {
    page: PropTypes.object,
    settings: PropTypes.object
};

function Slug(props: any) {

   const theme = props.settings[0].theme;
   const template = props.page.template;

   const Component = require(`../themes/${theme}/template-${template}.tsx`).default;
   return (
         <Component page={props.page} settings={props.settings}/>
   );
}

export default Slug;