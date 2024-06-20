import Button from "~/components/ui/button";

export default function Login() {
    return (
        <div className="flex items-center justify-center ">
            <form>
                <input type="text" name="username"  />
                <input type="email" name="email" />
                <input type="password" name="password"  />
                <Button > 
                    submit
                </Button>
                <button type="submit">fg</button>
            </form>
        </div>
    )
}