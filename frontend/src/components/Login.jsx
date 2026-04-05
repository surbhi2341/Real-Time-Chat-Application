import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [user, setuser] = useState({
            
            username: "",
            password: "",
           
        });
        
        const onSubmitHandler = (e) => {
            e.preventDefault();
            console.log(user);
            setuser({
            
                username: "",
                password: "",
                
    
            })
        }
    return (
        <div className="min-w-96 mx-auto ">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop -blur-md bg-opacity-10 border border-gray-100">
                <h1 className="text-3xl font-bold text-center text-black ">Login</h1>
                <form onSubmit= {onSubmitHandler} action="">
                    <div>
                        
                        <label className='label p-2'>
                            <span className='text-base label-text text-black '>Username</span>

                        </label>

                        <input
                            value={user.username}
                            onChange={(e) => setuser({...user,username:e.target.value}) }
                            className='w-full input input-bordered h-10 bg-white text-black'
                            type="text"
                            placeholder='Username' />
                        <label className='label p-2'>
                            <span className='text-base label-text text-black '>Password</span>

                        </label>

                        <input
                            value={user.password}
                            onChange={(e) => setuser({...user,password:e.target.value}) }
                            className='w-full input input-bordered h-10 bg-white text-black'
                            type="password"
                            placeholder='Password' />
                        
                    </div>
                    

                    <p className='text-center text-black'>  Don't have an account?
                        <Link to="/register" >
                            Signup
                        </Link>
                    </p>




                    <div className='my-2 btn btn-block btn-sm bg-white mt-2 border border-slate-700 text-black'>
                        <button type='Submit'>Login</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Login