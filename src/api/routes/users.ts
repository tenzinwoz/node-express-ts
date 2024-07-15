import { Request, Response, Router } from "express";
import { getUsers, getUserById, addUser } from "../controller/users";

const router = Router();

//Get all users
router.get("/", (req: Request, res: Response) => getUsers(req, res));

//Add user
router.post("/", (req: Request, res: Response) => addUser(req, res));

//Get user by id
router.get("/:id", (req: Request, res: Response) => getUserById(req, res));

export default router;
