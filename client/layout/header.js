import React from "react";
import {Link} from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";


export default function Header(){
    return(
        <header id="header">
            <Link  to = "/">
                <h1 className = "title">KT | Key-Training
                </h1>
            </Link>
            </header>
    )
};