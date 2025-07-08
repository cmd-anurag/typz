function Navbar() {
    return (
        <>
            <div className="px-16 py-8 flex justify-around">
                <h1 className="text-4xl text-[#f2e9e4] font-bold">typx</h1>
                <ul className="flex items-center text-[#c9ada7] gap-10">
                    <li><a href="#" className="hover:text-[#f2e9e4] duration-300">Home</a></li>
                    <li><a href="#" className="hover:text-[#f2e9e4] duration-300">Stats</a></li>
                    <li><a href="#" className="hover:text-[#f2e9e4] duration-300">About us</a></li>
                </ul>
            </div>
        </>
    )
}

export default Navbar;