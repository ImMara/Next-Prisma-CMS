import React from 'react';
import {signIn, signOut, useSession} from "next-auth/react";

function Index(props) {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                <button onClick={() => signOut()}>Sign out</button>
                <div>
                    <h1>Admin</h1>
                </div>
            </>
        )  }else{
return (
            <>
                <button onClick={() => signIn()}>Sign in</button>
            </>
        )
    }

}

export default Index;