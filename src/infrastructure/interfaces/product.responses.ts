export interface ProductResponse {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
}

export interface Response {
    data: ProductResponse[];
}
