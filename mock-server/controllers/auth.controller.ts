// Follow http methods name for naming convention for functions
import { Request, Response, NextFunction } from "express";
import { readAllUsers } from "../services/user.service";
import {
  readUsersByEmail,
  createUsers,
  updateUsers,
  createSession,
  deleteSession,
  readSessionsByEmail,
} from "../services/auth.service";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const results = await readAllUsers();
    if (results) {
      const user = results.find((user) => user.email === email);
      if (user) {
        if (user.password === password) {
          console.log("user", user);
          delete user.password;
          const token = {
            email: user.email,
            access: `${user.id}${user.email}${user.name}${user.city}`,
            refresh: `${user.name}${user.city}${user.id}${user.email}`,
          };

          const session = await readSessionsByEmail(user.email);
          console.log("session", session);

          if (!session) {
            await createSession(token);
            res.status(200).json({
              message: "Login Successful",
              profile: user,
              token,
            });
            return;
          }
          res
            .status(200)
            .json({ message: "User already logged in", profile: user, token: session });
          return;
        }
        res.status(401).json({
          message: "Invalid Email or Password",
        });
        return;
      }
      res.status(401).json({
        message: "Invalid Email or Password",
      });
      return;
    }

    res.status(404).end();
    return;
  } catch (err) {
    next(err);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, city, email, password } = req.body;
    const user = await readUsersByEmail(email);
    if (user) {
      res.status(400).json({
        message: "User Already Exists",
      });
      return;
    }
    await createUsers({ name, city, email, password });
    res.status(404).json({
      message: "User Created",
    });
    return;
  } catch (err) {
    next(err);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access } = req.body;
    await deleteSession(access);
    res.status(201).end();
    return;
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const user = await createUsers(payload);
    res.status(200).json(user);
    return user;
  } catch (err) {
    next(err);
  }
};

export const resetPassword = (req: Request, res: Response, next: NextFunction) => {
  try {
    const type = "put";
    const { id } = req.params;
    const { id: excludingId, ...payload } = req.body;
    const user = updateUsers(type, Number(id), payload);
    res.status(200).json(user);
    return user;
  } catch (err) {
    next(err);
  }
};
