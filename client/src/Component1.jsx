import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Component1 = (props) => {
    const { name } = props;
    const [count, setCount] = useState(0);
    const [state, setState] = useState(0);
    const [id, setId] = useState(1);
    const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    console.log('Render');

    const URL = 'https://jsonplaceholder.typicode.com/users';


    // fetch all users
    // fetch user by ID

    const fetchAllUsers = async () => {
        console.log("🚀 ~ fetchAllUsers ~ count:", count)
        // fetch(URL).then(res=>res.json()).then(data=>{
        //     console.log("🚀 ~ fetchAllUsers ~ data using fetch:", data)
        // });
        // axios.get(URL).then(res => {
        //     console.log(res.data)
        // });
        const { data } = await axios.get(URL)
        console.log("🚀 ~ fetchAllUsers ~ data:", data);
        setAllUsers(data)
    };
    useEffect(() => { fetchAllUsers() }, [fetchAllUsers])

    const fetchUserById = async () => {
        // https://jsonplaceholder.typicode.com/users
        // https://jsonplaceholder.typicode.com/users/4
        const userURL = `${URL}/${id}`;
        const { data } = await axios.get(userURL);
        setUser(data)
        console.log("🚀 ~ fetchUserById ~ data:", data)
    };


    useEffect(() => {
        fetchUserById();
    }, [id])

    // useEffect(() => {
    //     console.log("🚀 ~ Component1 ~ useEffect without dep array runs on every render")
    // });



    useEffect(() => {
        // Runs only once when the component is mounted
        // works like mounting phase of react component life cycle
        // eg -> Add eventListeners, setInterval

        console.log("🚀 ~ Component1 ~ useEffect with empty dep array");
        // network heavy operation, want to do this only once when component loads
        // fetchAllUsers();

        // cleanup fn runs on unmounting
        return () => {
            // eg -> remove eventListeners
            // clearInterval
            console.log('Component got unmounted')
        }
    }, []);

    useEffect(() => {
        console.log("🚀 ~ Component1 ~ useEffect only runs when count changes - ", count)
    }, [count]);



    const incrementCount = () => {
        setCount(count + 1)
    }

    // mounting
    // Update -> re-render-> caused by state update or props update
    // unmounting

    return (
        <>
            <h2>Hello {name}</h2>
            <div> count - {count}</div>
            <div> other state - {state}</div>
            <button onClick={incrementCount}>Increment count</button>
            <button onClick={() => setState(state + 1)}>Increment other state</button>

            <br />
            <input onChange={(e) => {
                setId(e.target.value);
                console.log("🚀 ~ Component1 ~ e.target:", e.target)
            }} type="number" placeholder='Enter user id' min={1} max={10} />

            <h2>All user details</h2>
            <section>
                {allUsers.map(user => <section key={user.id}>{user.name}</section>)}
            </section>

            <h2>User details</h2>
            <section>{user?.name}</section>

            <button onClick={() => {
                const newUsers = [...allUsers];
                const idx = Math.floor(Math.random() * 10);
                newUsers[idx].name = 'test';
                setAllUsers(newUsers)
            }}>Update Name</button>
        </>
    )
}

export default Component1