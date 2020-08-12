export enum NavItem {
  MAIN,
  ABOUT,
  TECH,
  BOOKS,
  GITHUB,
  LINKEDIN,
}

const Nav: React.FC<{selected: NavItem}> = ({selected}) => {
  return (
    <nav className="sm:container flex flex-wrap mx-auto justify-between my-10">
      <a href="" className={`text-lg pb-1 px-1 ${selected === NavItem.MAIN ? "border-b-2 border-blue-500" : ""}`}>Pulpdrew</a>
      <a href="" className={`text-lg pb-1 px-1 ${selected === NavItem.ABOUT ? "border-b-2 border-blue-500" : ""}`}>About</a>
      <a href="" className={`text-lg pb-1 px-1 ${selected === NavItem.TECH ? "border-b-2 border-blue-500" : ""}`}>Tech</a>
      <a href="" className={`text-lg pb-1 px-1 ${selected === NavItem.BOOKS ? "border-b-2 border-blue-500" : ""}`}>Books</a>
      <a href="" className={`text-lg pb-1 px-1 ${selected === NavItem.GITHUB ? "border-b-2 border-blue-500" : ""}`}>GitHub</a>
      <a href="" className={`text-lg pb-1 px-1 ${selected === NavItem.LINKEDIN ? "border-b-2 border-blue-500" : ""}`}>LinkedIn</a>
    </nav>
  );
}
export default Nav;