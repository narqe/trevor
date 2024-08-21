export interface Country {
    code: string,
    name: string,
    capital: string,
    currency: string,
    phone: string,
    emoji: string,
    awsRegion: string,
    languages: Language[] 
}

export interface Language {
    name: string,
}