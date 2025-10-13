import { SQLiteRoleRepository } from "core/repository/databases/sqlite-role-repository.js";
import { UpdateRoleUseCase } from "core/use-case/role-use-case/update-role-use-case.js";

export abstract class MakeUpdateFactory{
    public static make(){
    const repository = new SQLiteRoleRepository()
    const useCase = new UpdateRoleUseCase(repository)
    return useCase
    }
}