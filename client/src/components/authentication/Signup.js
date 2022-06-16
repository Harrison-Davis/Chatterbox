import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";


const Signup = () => {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [pic, setPic] = useState()
    const [loading, setPicLoading] = useState();
    const toast = useToast();
    const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const handleShowPass = () => setShowPass(!showPass)
    const handleShowConfirmPass = () => setShowConfirmPass(!showConfirmPass)

const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
        toast({
            title: "Please Select an Image!",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chatterbox");
        data.append("cloud_name", "supaskillet");
        fetch("https://api.cloudinary.com/v1_1/supaskillet/image/upload", {
        method: "post",
        body: data,
    })
        .then((res) => res.json())
        .then((data) => {
            setPic(data.url.toString());
            console.log(data.url.toString());
            setPicLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setPicLoading(false);
        });
    } else {
        toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
        });
        setPicLoading(false);
        return;
    }
};

const handleSubmit= async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmPassword) {
        toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        setPicLoading(false);
        return;
    }
    if (password !== confirmPassword) {
        toast({
            title: "Passwords Do Not Match",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        return;
    }
    console.log(name, email, password, pic);
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const { data } = await axios.post(
        "/api/user",
            {
                name,
                email,
                password,
                pic,
            },
        config
        );
        console.log(data);
        toast({
            title: "Registration Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setPicLoading(false);
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
        setPicLoading(false);
    }
};


    return (
        <VStack spacing="5px">
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input 
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}/>
            </FormControl>

            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input 
                placeholder="Email"
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
                    onChange={(e) => setPassword(e.target.value)}/>
                </InputGroup>
            </FormControl>

            <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <InputRightElement width="4.5rem" size="sm">
                    <Button onClick={handleShowConfirmPass}>{showConfirmPass ? "Hide" : "Show"} </Button>
                    </InputRightElement>
                    <Input 
                    type={ showConfirmPass ? "text" : "password"}
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}/>
                </InputGroup>
            </FormControl>
            
            <FormControl id="first-name" isRequired>
                <FormLabel>Profile Picture</FormLabel>
                <Input 
                    type="file"
                    p={1.5}
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.files[0])}/>
            </FormControl>

            <Button
            colorScheme="blue"
            width="100%"
            style={{marginTop:15}}
            onClick={handleSubmit}
            isLoading={loading}
            >
                Sign Up
            </Button>

        </VStack>
    )
}

export default Signup
