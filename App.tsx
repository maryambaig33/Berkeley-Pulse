import React, { useState, useEffect } from 'react';
import ArticleHeader from './components/ArticleHeader';
import ArticleContent from './components/ArticleContent';
import AiSidebar from './components/AiSidebar';
import { ArticleData } from './types';

// Mock data reflecting the URL provided in the prompt
const MOCK_ARTICLE: ArticleData = {
  id: 'hpb-closure-2025',
  title: 'Half Price Books in Downtown Berkeley to Close After 25 Years',
  subtitle: 'The beloved Shattuck Avenue staple cites rising rent and shifting retail landscape as reasons for its upcoming December closure.',
  author: 'Elena Rodriguez',
  date: 'December 1, 2025',
  category: 'Business',
  location: {
    lat: 37.86988, 
    lng: -122.26804,
    name: "Half Price Books Berkeley"
  },
  imageUrl: 'https://picsum.photos/seed/books/800/400',
  content: [
    "BERKELEY — In a blow to local bibliophiles and bargain hunters, Half Price Books has announced it will shutter its Shattuck Avenue location by the end of the year. The store, a fixture of downtown Berkeley’s retail corridor for a quarter-century, will begin liquidation sales immediately.",
    "Employees were notified Monday morning of the decision. According to a statement released by the Dallas-based chain, the closure is driven by a combination of lease expiration, a significant rent hike proposed by the building's new owners, and a gradual decline in foot traffic post-pandemic.",
    "\"We have loved being part of the Berkeley community,\" said District Manager Mark Thompson. \"This decision was not made lightly. We explored every option to stay, but the economics of this specific location are no longer sustainable in the current real estate market.\"",
    "The news comes amidst a wave of changes for downtown Berkeley, which has seen several long-standing businesses replaced by mixed-use housing developments in recent years. While housing advocates celebrate the density, preservationists worry about the loss of cultural anchors like affordable bookstores.",
    "\"It's devastating,\" said Sarah Jenkins, a UC Berkeley graduate student browsing the clearance racks on Tuesday. \"I've bought half my syllabus here every semester. It's one of the few places students can actually afford to build a library.\"",
    "The store plans to remain open through the holiday season, with a final closing date tentatively set for January 15, 2026. Until then, the community is invited to share memories and shop the remaining inventory.",
    "Local officials have expressed concern about the vacancy this will leave on Shattuck Avenue. Councilmember Terry Taplin tweeted, \"We need to ensure our commercial landlords aren't pricing out the very businesses that make Berkeley vibrant. Losing HPB is a wake-up call.\""
  ]
};

const App: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation Bar */}
      <nav className="bg-stone-900 text-white py-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center font-bold text-xl serif">B</div>
            <span className="font-bold text-lg tracking-tight">Berkeley Pulse</span>
          </div>
          <div className="hidden md:flex space-x-6 text-sm font-medium text-stone-300">
            <a href="#" className="hover:text-white transition">News</a>
            <a href="#" className="hover:text-white transition">Arts</a>
            <a href="#" className="hover:text-white transition">Food</a>
            <a href="#" className="hover:text-white transition">Real Estate</a>
          </div>
          <button className="md:hidden text-white">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Article Column */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-stone-100">
              <ArticleHeader article={MOCK_ARTICLE} />
              <ArticleContent article={MOCK_ARTICLE} />
            </div>
            
            {/* Comments Placeholder */}
            <div className="mt-12 border-t border-stone-200 pt-8">
              <h3 className="font-bold text-xl mb-6">Community Discussion</h3>
              <div className="bg-stone-100 p-6 rounded-lg text-center text-stone-500">
                Log in to join the conversation about Half Price Books.
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <aside className="lg:col-span-4 space-y-8">
            {/* AI Sidebar Component */}
            <AiSidebar article={MOCK_ARTICLE} />

            {/* Traditional Sidebar Content */}
            <div className="bg-stone-100 p-6 rounded-xl">
              <h3 className="font-bold text-stone-900 mb-4 border-b border-stone-300 pb-2">Trending in Berkeley</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="group">
                    <span className="text-xs text-orange-600 font-bold uppercase block mb-1">Dining</span>
                    <h4 className="font-medium text-stone-800 group-hover:text-orange-700 transition">New Ethiopian spot opens on Telegraph</h4>
                  </a>
                </li>
                <li>
                  <a href="#" className="group">
                    <span className="text-xs text-orange-600 font-bold uppercase block mb-1">City Hall</span>
                    <h4 className="font-medium text-stone-800 group-hover:text-orange-700 transition">BART Plaza redesign plans unveiled</h4>
                  </a>
                </li>
                <li>
                  <a href="#" className="group">
                    <span className="text-xs text-orange-600 font-bold uppercase block mb-1">Campus</span>
                    <h4 className="font-medium text-stone-800 group-hover:text-orange-700 transition">Cal Bears clinch victory in overtime</h4>
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-orange-600 p-6 rounded-xl text-white">
              <h3 className="font-bold text-xl mb-2">Support Local Journalism</h3>
              <p className="text-orange-100 text-sm mb-4">We rely on reader support to keep Berkeley informed.</p>
              <button className="w-full bg-white text-orange-700 font-bold py-2 rounded shadow hover:bg-orange-50 transition">
                Become a Member
              </button>
            </div>
          </aside>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">&copy; 2025 Berkeley Pulse. All rights reserved.</p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
