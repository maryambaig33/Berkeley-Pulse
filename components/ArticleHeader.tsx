import React from 'react';
import { ArticleData } from '../types';

interface ArticleHeaderProps {
  article: ArticleData;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article }) => {
  return (
    <header className="mb-8 border-b border-stone-200 pb-8 relative">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2 text-orange-700 font-bold uppercase tracking-wider text-xs">
          <span>{article.category}</span>
          <span>•</span>
          <span>Local Business</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 bg-stone-100 px-2 py-1 rounded-full border border-stone-200">
           <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-semibold text-stone-600 uppercase tracking-wide">Pulse AI Active</span>
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-4 leading-tight serif">
        {article.title}
      </h1>
      <p className="text-xl md:text-2xl text-stone-600 font-light leading-relaxed mb-6 serif">
        {article.subtitle}
      </p>
      <div className="flex items-center justify-between text-sm text-stone-500 font-medium">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-stone-300 overflow-hidden">
             <img src="https://picsum.photos/100/100?grayscale" alt="Author" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-stone-900">{article.author}</p>
            <p>{article.date}</p>
          </div>
        </div>
        <div className="hidden md:flex space-x-4">
           {/* Social mock icons */}
           <button className="hover:text-orange-600 transition">Share</button>
           <button className="hover:text-orange-600 transition">Save</button>
        </div>
      </div>
    </header>
  );
};

export default ArticleHeader;