import React from 'react'
import { Link } from 'react-router-dom'

const SingleUser = ({ user }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50 p-4 m-4 hover:opacity-50">
            <div>
            <Link to={`users/${user.login}`}>
                <img className="w-24 h-24 object-cover rounded-full mx-auto border-4 border-gray-300" src={user.avatar_url} alt="User Avatar" />
                <div className="text-center mt-4 min-w-96">
                    <h3 className="text-xl font-bold mb-2">{user.login}</h3>
                    <p className="text-gray-700 text-base">Email: {user.url}</p>
                    <p className="text-gray-700 text-base">ID: {user.id}</p>
                    <p className="text-gray-700 text-base">{user.node_id}</p>
                </div>
            </Link>
            </div>
            
        </div>
    )
}

export default SingleUser
