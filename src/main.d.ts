interface Domain {
    domain: string;
    owner: Owner;
    source: string[];
    prevalence: number;
    sites: number;
    subdomains: string[];
    cnames: any[];
    fingerprinting: number;
    resources: Resource[];
    categories: string[];
    performance: Performance;
    cookies: number;
    nameservers: string[];
}

interface Performance {
    time: number;
    size: number;
    cpu: number;
    cache: number;
}

interface Resource {
    rule: string;
    cookies: number;
    fingerprinting: number;
    subdomains: string[];
    apis: Apis;
    sites: number;
    prevalence: number;
    cnames: any[];
    responseHashes: string[];
    type: string;
    firstPartyCookies: Record<string, FirstPartyCookie>
    firstPartyCookiesSent: Record<string, number>
    exampleSites: string[];
}

interface FirstPartyCookie {
    ttl: number;
    length: number;
    prevalence: number;
    uniqueness: number;
}

type Apis = Record<string, number>

interface Owner {
    name: string;
    displayName: string;
    privacyPolicy: string;
    url: string;
}