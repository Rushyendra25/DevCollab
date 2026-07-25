function Footer() {
    return (
      <footer className="bg-gray-900 text-white mt-24">
        <div className="max-w-7xl mx-auto py-6 text-center">
          © {new Date().getFullYear()} DevCollab.
          Built with React & Node.js.
        </div>
      </footer>
    );
  }
  
  export default Footer;