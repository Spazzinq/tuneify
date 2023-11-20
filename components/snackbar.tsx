'use client'

import { SnackbarProvider } from "notistack";

const Snackbarz = ( props : any ) => {
    return (
        <SnackbarProvider>
            <body className={props.news_cycle.className + " tracking-wide"}>{props.children}</body>
        </SnackbarProvider>
    );
}

export default Snackbarz;