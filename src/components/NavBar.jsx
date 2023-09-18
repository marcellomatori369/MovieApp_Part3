import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BiSolidMoviePlay, BiSearchAlt2, BiStar } from "react-icons/bi"

import "./Navbar.css"

const NavBar = () => {
  const [search, setSearch] = useState("")
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!search) return

    navigate(`/search?q=${search}`)
    setSearch("")
  }

    return (
        <nav id="navbar">
          <h2>
            <Link to="/">
              <BiSolidMoviePlay />MovieApp
              </Link>
          </h2>
          <h2>
            <Link to="/favorite">
              <BiStar />Favorite
              </Link>
          </h2>
          <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder="Busque um filme" 
            onChange={(e) => setSearch(e.target.value)}
            value= {search}
            />
            <button type="submit">
                <BiSearchAlt2 />
            </button>
          </form>
        </nav>
    )
}

export default NavBar