import { SQLiteRoleRepository } from "core/repository/databases/sqlite-role-repository.js";
import { DeleteRoleUseCase } from "core/use-case/role-use-case/delete-role-use-case.js";

export abstract class MakeDeleteRoleFactory{
    public static make(){
        const repository = new SQLiteRoleRepository()
        const useCase = new DeleteRoleUseCase(repository)
        return useCase
    }
}