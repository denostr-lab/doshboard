export interface Invoices{
    "_id": string,
    "pubkey": string,
    "unit": string,
    "status": string,
    "created_at": string,
    "amount_requested": number,
    "amount_paid": number
}

export interface InvoicesList{
    "totalDocs": number,
    "limit": number,
    "totalPages": number,
    "page": number,
    "pagingCounter": number,
    "hasPrevPage": boolean,
    "hasNextPage": boolean,
    "prevPage": number | null,
    "nextPage": number | null,
    "docs": Invoices[]
}