export default function Header() {
  return (
    <div className="navbar bg-base-100 shadow-md px-16 justify-between">
      {/* Left: Logo */}
      <div className="flex-none">
        <a
          href="/homepage"
          className="hover:cursor-pointer font-bold p-3 text-xl"
        >
          App Name
        </a>
      </div>

      {/* Right: Menu */}
      {/* <div className="flex-none flex-row space-x-2">
        <Link href="/register" className="btn btn-outline btn-ghost">
          Register
        </Link>
        <Link href="/login" className="btn btn-primary">
          Login
        </Link>
      </div> */}
    </div>
  );
}
