import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import your custom CSS file

const App = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [response, setResponse] = useState('');
    const [userDataList, setUserDataList] = useState([]); // Store all user data

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { name, address };
        try {
            await axios.post('http://localhost:5000/register', user);
            setResponse('User registered successfully!');
            
            // Add new user to the list and reset input fields
            setUserDataList([...userDataList, user]);
            setName(''); // Clear name input field
            setAddress(''); // Clear address input field
        } catch (error) {
            setResponse('Error registering user.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="form-container shadow p-5 bg-white rounded">
                <h1 className="text-center mb-4">Register User</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="address">Address</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="address" 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
                {response && <p className="response-message mt-3 text-center">{response}</p>}
            </div>

            {/* Display all User Details Section */}
            {userDataList.length > 0 && (
                <div className="user-details mt-5 p-4 bg-light shadow-sm rounded">
                    <h2 className="text-center">User Details</h2>
                    <div className="user-info mt-3">
                        {userDataList.map((user, index) => (
                            <div key={index} className="user-detail mb-3 p-3 border rounded">
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Address:</strong> {user.address}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
