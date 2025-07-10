function Navbar() {
    return (
        <>
            <div className="px-16 py-4 mt-8 flex justify-around items-center">
                <div className="flex">
                    <img src="/icon.svg" className="size-13 mr-4"></img>
                    <h1 className="text-5xl text-[#f2e9e4] delicious-handrawn-regular">typz</h1>
                </div> 
                <ul className="flex items-center text-[28px] text-[#e0fbfc] gap-13">
                    <span className="material-symbols-outlined"><a href="#">home</a></span>
                    <span className="material-symbols-outlined"><a href="#">info</a></span>
                    <span className="material-symbols-outlined"><a href="#">account_circle</a></span>
                </ul>
            </div>
        </>
    )
}

export default Navbar;