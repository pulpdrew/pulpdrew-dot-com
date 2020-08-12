import Link from 'next/link'

export enum NavItem {
  MAIN,
  ABOUT,
  TECH,
  BOOKS,
  GITHUB,
  LINKEDIN,
  NONE,
}

const selectedClasses = "text-lg pb-1 px-1 border-b-2 border-blue-700";
const defaultClasses = "text-lg pb-1 px-1";

const Nav: React.FC<{selected: NavItem}> = ({selected}) => {
  return (
    <nav className="sm:container flex flex-wrap mx-auto justify-between my-10">
      <Link href="/"><a className={selected === NavItem.MAIN ? selectedClasses : defaultClasses}>Pulpdrew</a></Link>
      <Link href="/about"><a className={selected === NavItem.ABOUT ? selectedClasses : defaultClasses}>About</a></Link>
      <Link href=""><a className={selected === NavItem.TECH ? selectedClasses : defaultClasses}>Tech</a></Link>
      <Link href=""><a className={selected === NavItem.BOOKS ? selectedClasses : defaultClasses}>Books</a></Link>
      <Link href=""><a className={selected === NavItem.GITHUB ? selectedClasses : defaultClasses}>GitHub</a></Link>
      <Link href=""><a className={selected === NavItem.LINKEDIN ? selectedClasses : defaultClasses}>LinkedIn</a></Link>
    </nav>
  );
}
export default Nav;