import { SQLiteRoleRepository } from "core/repository/databases/sqlite-role-repository.js";
import { CreateRoleUseCase } from "core/use-case/role-use-case/create-role-use-case.js";

export abstract class MakeCreateRoleFactory{
    public static make(){
        const repository = new SQLiteRoleRepository()
        const useCase = new CreateRoleUseCase(repository)
        return useCase
    }
}