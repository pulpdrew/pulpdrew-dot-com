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

const selectedClasses = "text-lg mb-1 mx-1 border-b-2 border-blue-700";
const defaultClasses = "text-lg mb-1 mx-1 border-b-2";

const Nav: React.FC<{selected: NavItem}> = ({selected}) => {
  return (
    <nav className="sm:container flex flex-wrap mx-auto justify-between my-10">
      <Link href="/"><a className={selected === NavItem.MAIN ? selectedClasses : defaultClasses}>Pulpdrew</a></Link>
      <Link href="/about"><a className={selected === NavItem.ABOUT ? selectedClasses : defaultClasses}>About</a></Link>
      <Link href="/tech"><a className={selected === NavItem.TECH ? selectedClasses : defaultClasses}>Tech</a></Link>
      <Link href="/books"><a className={selected === NavItem.BOOKS ? selectedClasses : defaultClasses}>Books</a></Link>
      <Link href="https://www.github.com/pulpdrew">
        <a>
          <img alt="GitHub" src="/github.png" className="w-8 h-8 mx-1 mb-1"></img>
        </a>
      </Link>
      <Link href="https://linkedin.com/in/pulpdrew">
        <a>
          <img alt="LinkedIn" src="/linkedin.png" className="w-8 h-8 mx-1 mb-1"></img>
        </a>
      </Link>
    </nav>
  );
}
export default Nav;