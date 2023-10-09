import { Controller, Delete, Get, HttpStatus, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { UserService } from "src/services/user.service";
import { ErrorHandler } from "src/utils/ErrorHandler";

@Controller("user")
export class UserController{
    constructor(private userService: UserService){}

    @Get()
    async get(){
        const users = await this.userService.get();
        return users;
    }
    @Get(':id')
    async findById(@Param('id') id: string, @Res() response:Response){
        try{  
            const user = await this.userService.findById(id);
            response.status(HttpStatus.OK).send(user);
        }
        catch(error){
            if(error instanceof ErrorHandler)
            return response.status(error.status).send({
                error: error.message
            });
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                error: error.message
            });
        }
    }
    @Delete(':id')
    async delete(@Param('id') id: string, @Res() response:Response){
        try{
            await this.userService.delete(id);
            response.status(HttpStatus.OK).send({
                message: "The user was deleted"
            });
        }
        catch(error){
            if(error instanceof ErrorHandler)
            return response.status(error.status).send({
                error: error.message
            });
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                error: error.message
            });
        }
        await this.userService.delete(id);
        return {
            message: "The user was deleted"
        }
    }
}