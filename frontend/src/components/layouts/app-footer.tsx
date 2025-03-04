  import { Link } from "../ui";

  export const AppFooter = () => {
    return (
      <footer className="flex flex-col sm:flex-row items-center justify-center h-[76px] text-[14px] font-[500] text-[#555] p-4">
        <div className="flex flex-wrap justify-center gap-[10px] mb-2 sm:mb-0">
          <Link className="after:content-['|'] after:ml-2" to="/search/imprint">Imprint</Link>
          <Link className="after:content-['|'] after:ml-2" to="/search/privacy">Data Privacy</Link>
          <Link to="/search/policy">Data Policy</Link>
        </div>
        <span className="text-center sm:text-left">
          <p>© 2025 wwebsitee.com </p>
        </span>
      </footer>
    );
  };