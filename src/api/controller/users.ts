import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      message: "Success",
      data: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" },
      ],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    res.status(200).json({
      message: "Success",
      data: { id: id, name: "John Doe" },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    console.log(body);

    res.status(200).json({
      message: "Success",
      data: body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
