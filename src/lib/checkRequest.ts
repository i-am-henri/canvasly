import { redirect } from "next/navigation";
import { lucia } from "../auth/lucia";

export const validateProtected = async () => {
    const req = await lucia.validateRequest();

    if (!req.session) {
        redirect("/login");
    }
    return req;
};