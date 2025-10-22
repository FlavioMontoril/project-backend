// import { ResourceNotFoundError } from "core/errors/resource-not-found.js"
// import { MakeFindUserByEmailFactory } from "core/factory/user-factory/make-find-user-by-email-factory.js"
// import type { Request, Response } from "express"
// import z from "zod"

// class FindUserByEmailController {
//     public async handle(req: Request, res: Response) {
//         try {

//             const paramsSchema = z.object({
//                 email: z.string(),
//             })

//             const {email} = paramsSchema.parse(req.params)

//             const useCase = MakeFindUserByEmailFactory.make()
//             const user = await useCase.execute(email)
            
//             res.status(200).json(user)

//         } catch (error) {
//             if (error instanceof z.ZodError) {
//                 res.status(400).json({ error: error.issues })
//                 return
//             }
//             if (error instanceof ResourceNotFoundError) {
//                 res.status(404).json({ error: error.message })
//                 return
//             }
//             res.status(500).json({ message: 'Internal Server Error' })
//             return
//         }
//     }
// }
// export default new FindUserByEmailController()