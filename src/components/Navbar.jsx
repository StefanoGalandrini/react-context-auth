import {NavLink} from "react-router-dom";

function NavbarLink({href, children}) {
	return (
		<NavLink
			to={href}
			className="block py-3 px-4 min-w-[80px] text-center rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-primary">
			{children}
		</NavLink>
	);
}

function Navbar() {
	return (
		<header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-lg">
			<nav className="py-4">
				<div className="container px-4 mx-auto flex items-center justify-between">
					<div>
						<img src="/logo.png" alt="Blog Logo" className="w-[4rem]" />
					</div>

					<div className="text-fuchsia-900">
						<p className="text-3xl font-bold">SG BLOG - Web Developing Hate</p>
					</div>

					<div>
						{
							<ul className="flex gap-5">
								<li>
									<NavbarLink href="/">Home</NavbarLink>
								</li>
								<li>
									<NavbarLink href="/Blog">Blog</NavbarLink>
								</li>
							</ul>
						}
					</div>
				</div>
			</nav>
		</header>
	);
}

export default Navbar;
