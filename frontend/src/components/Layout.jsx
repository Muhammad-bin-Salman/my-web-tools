import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col w-screen">

      <Header />

      <div className="flex flex-1 w-full">

        {/* Sidebar */}
        <div className="hidden md:block w-64 bg-white shadow-lg">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 w-full p-6">
          {children}
        </main>

      </div>

      <Footer />

    </div>
  );
}


export default Layout;
