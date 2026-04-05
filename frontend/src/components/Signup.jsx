import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const Signup = () => {
    const [user, setuser] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });
    const handleCheckbox=(gender) =>{
        setuser({...user, gender})
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try{
         const res = await axios.post('http://localhost:8080/api/v1/user/register',user,{
            headers :{
                'Content-Type':'application/json'
            },
            withCredentials:true
         });
         console.log(res);
        }catch(error){
            console.log(error);

        }
        //console.log(user);
        setuser({
            fullName: "",
            username: "",
            password: "",
            confirmPassword: "",
            gender: "",

        })
    }
    return (
        <div className="min-w-96 mx-auto ">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop -blur-md bg-opacity-10 border border-gray-100">
                <h1 className="text-3xl font-bold text-center text-black ">Signup</h1>
                <form onSubmit ={onSubmitHandler} action="">
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-black '>Full Name</span>

                        </label>
                        <input
                            value={user.fullName}
                            onChange ={(e) => setuser({...user,fullName:e.target.value}) }
                            className='w-full input input-bordered h-10 bg-white text-black'
                            type="text"
                            placeholder='FullName' />
                        <label className='label p-2'>
                            <span className='text-base label-text text-black '>Username</span>

                        </label>

                        <input
                            value={user.username}
                            onChange ={(e) => setuser({...user,username:e.target.value}) }
                            className='w-full input input-bordered h-10 bg-white text-black'
                            type="text"
                            placeholder='Username' />
                        <label className='label p-2'>
                            <span className='text-base label-text text-black '>Password</span>

                        </label>

                        <input
                            value={user.password}
                            onChange ={(e) => setuser({...user,password:e.target.value}) }
                            className='w-full input input-bordered h-10 bg-white text-black'
                            type="password"
                            placeholder='Password' />
                        <label className='label p-2'>
                            <span className='text-base label-text text-black '>Confirm Password</span>

                        </label>

                        <input
                            value={user.confirmPassword}
                            onChange ={(e) => setuser({...user, confirmPassword:e.target.value}) }
                            className='w-full input input-bordered h-10 bg-white text-black'
                            type="password"
                            placeholder='Confirm Password' />

                    </div>
                    <div className='flex items-center my-4'>
                        <div className='flex items-center text-black'>
                            <p>Male</p>
                            <input 
                            
                            type="checkbox"
                            checked={user.gender === "male"}
                            onChange={() =>handleCheckbox("male")} 
                            defaultChecked 
                            className="checkbox text-black mx-2" />

                        </div>
                        <div className='flex items-center text-black'>
                            <p>Female</p>
                            <input 
                            type="checkbox" 
                            checked={user.gender === "female"}
                            onChange={() =>handleCheckbox("female")} 
                            defaultChecked 
                            className="checkbox text-black mx-2" />

                        </div>
                    </div>

                    <p className='my-2 text-center text-black'>Already have an account?
                        <Link to="/login" >
                            Login
                        </Link>
                    </p>




                    <div className='btn btn-block btn-sm bg-white mt-2 border border-slate-700 text-black'>
                        <button type='Submit' >Signup</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup