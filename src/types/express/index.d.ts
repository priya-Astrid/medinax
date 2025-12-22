import { authDocument } from "../../models/auth.model";
declare global{
    namespace Express {
        interface Request {
            user?: authDocument | any;
        }
    }
}