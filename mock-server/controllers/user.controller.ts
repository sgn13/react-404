// Follow http methods name for naming convention for functions
import { Request, Response, NextFunction } from "express";
import {
  readUsersCount,
  readUsersById,
  createUsers,
  readAllUsers,
  updateUsers,
  deleteUsers as removeUsers,
} from "../services/user.service";
import { getShortId } from "../utils";
import { directories } from "../constants/directories";
import { deleteFile } from "../utils";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // paginating user model
    const { page = "1", perPage = "10", order = "ASC", orderBy = "fullName" }: any = req.query;

    let prev = null;
    const current = {
      page: page ? parseInt(page, 10) : 1,
      perPage: perPage ? parseInt(perPage, 10) : 10,
    };
    let next = null;

    const fromIndex = current.page ? (current.page - 1) * current.perPage : 0;
    const toIndex = current.page ? current.page * current.perPage : 0;

    let results: any = await readAllUsers();
    const totalCount = results.length;
    if (totalCount) results = results.slice(fromIndex, toIndex);

    // endIndex number is less than total Documents number, it means next page must be there
    if (toIndex < totalCount) {
      next = {
        page: current.page + 1, // since index starts at 0
        perPage: current.perPage,
      };
    }
    // if 1 or more documents are skipped at the begining, it means previous page exists containing those skipped documents
    if (fromIndex > 0) {
      prev = {
        page: current.page - 1,
        perPage: current.perPage,
      };
    }

    if (results) {
      res.status(200).json({
        results,
        count: totalCount,
        next,
        prev,
        order: "",
        orderBy: "",
      });
      return;
    }
    res.status(404).end();
    return;

    // logger.info(res);
  } catch (err) {
    next(err);
  }
};

export const getUsersById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await readUsersById(id);
    if (user) {
      res.status(200).json(user);
      return;
    }
    res.status(404).end();
    return;
  } catch (err) {
    next(err);
  }
};

export const postUsers = async (
  req: Request & { uploadedFilename?: string },
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = req.body;
    const uploadedFileUrl = `${req.protocol}://${req.get("host")}${
      directories.PROFILE_PICTURE_MOUNTPOINT
    }/${req.uploadedFilename}`;

    payload.id = getShortId();
    payload.profilePic = uploadedFileUrl;
    payload.profileVideo = null;
    const user = await createUsers(payload);
    res.status(200).json(user);
    return user;
  } catch (err) {
    next(err);
  }
};

export const postProfileVideo = async (
  req: Request & { uploadedFilename?: string },
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.uploadedFilename) return res.status(404).json({ message: "No Video file found" });

    const { id } = req.params;
    const profileVideoUrl = `${req.protocol}://${req.get("host")}${
      directories.PROFILE_VIDEOS_MOUNTPOINT
    }/${req.uploadedFilename}`;

    const userWithVideo = updateUsers("patch", id, { profileVideo: profileVideoUrl });
    res.status(200).json(userWithVideo);
    return true;
  } catch (err) {
    next(err);
  }
};

// put replaces the entire document with the new one
// new fields could be added
export const putUsers = async (
  req: Request & { uploadedFilename?: string },
  res: Response,
  next: NextFunction,
) => {
  try {
    const type = "put";
    const { id } = req.params;
    const { id: excludingId, ...payload } = req.body;

    // if profilePic field contains file, req.file is truthy
    if (req.file) {
      // delete old photo
      const userOldInfo = await readUsersById(id);
      const oldProfilePictureNames = userOldInfo?.profilePic?.split("/") ?? [];
      const oldProfilePictureName = oldProfilePictureNames[oldProfilePictureNames?.length - 1];
      const oldProfilePicturePath = `${directories.PROFILE_PICTURE_UPLOAD_DIR}${oldProfilePictureName}`;
      deleteFile(oldProfilePicturePath);

      // set newly uploaded ProfilePic url
      const updatedFileUrl = `${req.protocol}://${req.get("host")}${
        directories.PROFILE_PICTURE_MOUNTPOINT
      }/${req.uploadedFilename}`;
      payload.profilePic = updatedFileUrl;
    }

    const user = updateUsers(type, id, payload);
    res.status(200).json(user);
    return true;
  } catch (err) {
    next(err);
  }
};

// patch replaces only the fields that are passed in the request
// only existing fields are updated
export const patchUsers = (req: Request, res: Response, next: NextFunction) => {
  try {
    const type = "patch";
    const { id } = req.params;
    const { id: excludingId, ...remainingPayload } = req.body;
    const user = updateUsers(type, id, remainingPayload);
    res.status(200).json(user);
    return true;
  } catch (err) {
    next(err);
  }
};

export const deleteUsers = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = removeUsers(String(id));
    res.status(204).json(user);
    return;
  } catch (err) {
    next(err);
  }
};
