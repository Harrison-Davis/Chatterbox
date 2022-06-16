import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {


    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false)
    const toast = useToast();
    const navigate = useNavigate();

    const handleShowPass = () => setShowPass(!showPass)


    const postDetails = (pics) => {

    }

const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
        toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        setLoading(false);
        return;
    }
    // console.log(email, password);
    try {
        const config = {
        headers: {
            "Content-type": "application/json",
        },
        };

        const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
        );
        // console.log(JSON.stringify(data));
        toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        navigate("/chats");
    } catch (error) {
        toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        setLoading(false);
    }
};

    return (
        <VStack spacing="5px">


            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </FormControl>

            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <InputRightElement width="4.5rem" size="sm">
                    <Button onClick={handleShowPass}>{showPass ? "Hide" : "Show"} </Button>
                    </InputRightElement>
                    <Input 
                    type={ showPass ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </InputGroup>
            </FormControl>


            <Button
            colorScheme="blue"
            width="100%"
            style={{marginTop:15}}
            onClick={handleSubmit}
            isLoading={loading}

            >
                Login
            </Button>

            <Button
            varient="solid"
            colorScheme="red"
            width="100%"
            onClick={() => {
                setEmail("guest@guest.com");
                setPassword("123456")
            }}
            >
                Sign In As Guest
            </Button>

        </VStack>
    )
}

export default Login
