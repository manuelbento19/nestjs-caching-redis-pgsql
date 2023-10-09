export class ErrorHandler extends Error{
    public status: number;
    constructor(message:string,statusCode?:number){
        super(message);
        this.message = message;
        this.status = statusCode || 400;
    }
}