import { logout } from "../components/auth";
import { useRouter } from "next/router";
import { Button } from "reactstrap";

const Logout = () => {
    const router = useRouter();
    return (
        <>
        <h3>Do you want to Sign Out?
        </h3>
        <br></br>
        <Button
            style={{ float: "center", width: 120 }}
            color="primary"
            onClick={() => {
                logout()
            }}
        >
            Yes
        </Button>
        <Button
            style={{ float: "center", width: 120 }}
            color="primary"
            onClick={() => {
                router.push("/")
            }}
        >
            No
        </Button>
       
        </>
    );
}
export default Logout;
