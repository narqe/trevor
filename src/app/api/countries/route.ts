"use server";

import { NextResponse, NextRequest } from 'next/server';
import { getClient } from './../../db/client';
import { gql } from '@apollo/client';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const searchTerm = searchParams.get('value') || '';
    const filterBy = searchParams.get('filterBy') || '';

    try {
        const searchFilter = filterBy ? { [filterBy]: { regex: searchTerm } } : {};

        const { data: { countries } } = await getClient().query({
            query: gql`
                query GetCountries($filter: CountryFilterInput) {
                    countries(filter: $filter) {
                        code,
                        name,
                        capital,
                        currency,
                        phone,
                        emoji,
                        awsRegion,
                        languages { name }
                    }
                }
            `,
            variables: { filter: searchFilter },
        });
        return NextResponse.json(countries, { status: 200 });
    } catch (error) {
        console.error('Error fetching countries:', error);
        return NextResponse.json({ error: 'Error fetching countries' }, { status: 500 });
    }
}
