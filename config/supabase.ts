
import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "./server";

export const supabase = createClient()