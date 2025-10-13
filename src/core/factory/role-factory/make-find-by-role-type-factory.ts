import { SQLiteRoleRepository } from "core/repository/databases/sqlite-role-repository.js";
import { FindByRoleTypeUseCase } from "core/use-case/role-use-case/find-by-role-type-use-case.js";

export class MakeFindByRoleTypeFactory{
    public static make(){
        const repository = new SQLiteRoleRepository()
        const useCase = new FindByRoleTypeUseCase(repository)
        return useCase
    }
}