import React from 'react';
import { ArticleData } from '../types';

interface ArticleContentProps {
  article: ArticleData;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  return (
    <article className="prose prose-stone prose-lg max-w-none serif">
      <figure className="mb-8 -mx-4 md:mx-0">
        <img 
          src={article.imageUrl} 
          alt="Half Price Books Storefront" 
          className="w-full h-96 object-cover md:rounded-lg shadow-sm"
        />
        <figcaption className="text-center text-sm text-stone-500 mt-2 italic">
          The beloved Shattuck Avenue location has served the community for over 20 years. Photo: Berkeleyside Staff.
        </figcaption>
      </figure>
      
      {article.content.map((paragraph, idx) => (
        <p key={idx} className="mb-6 leading-8 text-stone-800">
          {paragraph}
        </p>
      ))}
      
      <div className="my-8 p-6 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg">
        <h3 className="text-orange-900 font-bold text-lg mb-2 sans">Editor's Note</h3>
        <p className="text-orange-800 italic text-sm">
          This story is developing. Use the "Live Updates" panel to check for the most recent announcements regarding the closure date and inventory sales.
        </p>
      </div>
    </article>
  );
};

export default ArticleContent;
