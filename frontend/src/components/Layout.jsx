import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import StructuredData from './StructuredData';

function Layout({ children }) {
  return (
    <div className="fixed inset-0 flex flex-col">
      <StructuredData />
      {/* Fixed Header */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Fixed Sidebar – desktop only */}
        <aside className="hidden md:block w-64 bg-white shadow-lg overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Scrollable Main Content ONLY */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6 pt-8 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
}

export default Layout;