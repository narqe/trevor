"use server";

import { NextResponse, NextRequest } from 'next/server';
import { getClient } from './../../db/client';
import { gql } from '@apollo/client';

export async function GET(req: NextRequest) {  
    const searchParams = req.nextUrl.searchParams;
    const searchTerm = searchParams.get('name') || '';

    try {
        const { data: { countries } } = await getClient().query({
            query: gql`
                query GetCountries($searchTerm: String!) {
                    countries(filter: { name: { regex: $searchTerm } }) {
                        code,
                        name,
                        capital,
                        currency,
                        phone,
                        emoji
                        awsRegion,
                        languages { name }
                    }
                }
            `,
            variables: { searchTerm },
        })
        if (!countries.length) {
            return NextResponse.json(null, { status: 404 });
        }
        return NextResponse.json(countries, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
    }
}