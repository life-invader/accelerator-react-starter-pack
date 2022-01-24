import Footer from '../footer/footer';
import Header from '../header/header';

type AppLayoutType = {
  children: React.ReactNode,
}

function AppLayout({ children }: AppLayoutType) {
  return (
    <div className='wrapper'>
      <Header />

      <main className="page-content">
        <div className='container'>
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
