'use server'

import { headers } from "next/headers";

export const getUrl = () => {
    return headers().get('x-url');
}