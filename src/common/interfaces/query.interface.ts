export class QueryParams {
    readonly take: number;
    readonly skip: number;
    readonly name: string;
    readonly withDeleted?: boolean = false;
}
