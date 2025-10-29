import { Role } from "core/entities/role-entitie.js";
import type { RoleRepository } from "core/repository/contracts/role-repository.js";
import type { Role as PrismaRole } from "generated/prisma/index.js";
import { RoleMapper } from "./role-mapper.js";
import {PrismaClient} from "../../../../generated/prisma/index.js"
import type { RoleOptions } from "core/types/role-types.js";

const prisma = new PrismaClient()

export class PrismaRoleRepository implements RoleRepository{
    public async create(role: Role):Promise<void>{
        const rawRole: PrismaRole = RoleMapper.toPersistence(role)
        await prisma.role.create({
            data: rawRole
        });
    }

    public async findByOptions(roleOptions: RoleOptions):Promise<Role | null>{
        const rawRole: PrismaRole | null = await prisma.role.findFirst({
            where: {name: roleOptions},
        });
        if(!rawRole) return null
        return RoleMapper.toDomain(rawRole)
    }

    public async delete(id: string):Promise<void>{
         await prisma.role.delete({
            where: {id}
        });

    }

    public async update(role: Role):Promise<Role>{
        const rawRole:PrismaRole = RoleMapper.toPersistence(role)
        await prisma.role.update({
            where: {id: role.getId().toString()},
            data: rawRole
        });
        return RoleMapper.toDomain(rawRole)
    }

    public async findById(id: string):Promise<Role | null> {
        const rawRole: PrismaRole | null = await prisma.role.findUnique({
            where: {id},
            include: {user: true}
        });
        if(!rawRole) return null
        return RoleMapper.toDomain(rawRole)
    }
    public async findAll():Promise<Role[]>{
        const rawRole: PrismaRole[] = await prisma.role.findMany();
        return rawRole.map(RoleMapper.toDomain)
    }
}