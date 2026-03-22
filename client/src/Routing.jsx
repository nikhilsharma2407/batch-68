import React from 'react'
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router'

const Routing = () => {
    const params = useParams();
    const { pathname, search } = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    console.log("🚀 ~ Routing ~ searchParams.entries():", [...searchParams.entries()])

    console.log("🚀 ~ Routing ~ params:", params);

    return (
        <>
            <h2>Path - {pathname} </h2>
            <h2>route params - {params.productId} </h2>
            <h2>query string- {search}</h2>
            <h2>Search Params- {searchParams.get('query')}</h2>

            <input type="text" onChange={e => setSearchParams({ query: e.target.value })} />
            <br />
            <Button onClick={() => { navigate('/flex') }}>go to flexbox</Button>
        </>
    )
}

export default Routing