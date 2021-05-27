import React from 'react'
import gql from 'graphql-tag'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Stores } from '../pages/client/stores'
import { Header } from '../components/header'
import { useMe } from '../hooks/useMe'

const ClientRoutes = [
 <Route path="/" exact>
     <Stores/>
 </Route>
]


const ME_QUERY = gql`
 query meQuery{
     me{
         id
         email
         role
         verified         
     }
 }
`

export const LoggedInRouter  =() => {
    const {data, loading, error} = useMe()
    if(!data || loading || error){
        return(
            <div className="h-screen flex justify-center items-center">
                <span className="font-medium text-xl tracking-wide">Loading...</span>
            </div>
        )
    }
    return(
        <Router>
            <Header/>
          <Switch>
            {data.me.role === "Client" && ClientRoutes}
            <Redirect to="/" />
          </Switch>
        </Router>
    );
}