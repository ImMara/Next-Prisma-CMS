import { PrismaClient } from '@prisma/client'
import React, {useState} from "react";
import {signIn, signOut, useSession} from "next-auth/react";

export async function getServerSideProps(): Promise<{ props: { contacts: any } }> {

    const prisma = new PrismaClient();
    const contacts = await prisma.user.findMany();

    return {
        props: {
            contacts: JSON.parse(JSON.stringify(contacts))
        }
    };
}

export default function Home(props: any) {

  const [contact, setContact] = useState(props.contacts);

        return (
            <>
                <div>
                    {contact && contact.map((contact: any) => (
                        <div key={contact.id}>
                            <h1>{contact.firstName}</h1>
                            <p>{contact.email}</p>
                        </div>
                    ))}
                </div>
            </>
        )


}


