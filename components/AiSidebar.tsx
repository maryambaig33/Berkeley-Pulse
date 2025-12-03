import React, { useState } from 'react';
import { getLatestUpdates, findAlternatives, analyzeSentiment } from '../services/geminiService';
import { ArticleData, GroundingChunk, UpdateType } from '../types';

interface AiSidebarProps {
  article: ArticleData;
}

const AiSidebar: React.FC<AiSidebarProps> = ({ article }) => {
  const [activeTab, setActiveTab] = useState<UpdateType | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [groundingSources, setGroundingSources] = useState<GroundingChunk[]>([]);

  const handleAction = async (type: UpdateType) => {
    setActiveTab(type);
    setLoading(true);
    setResult(null);
    setGroundingSources([]);

    try {
      if (type === UpdateType.LATEST_NEWS) {
        const response = await getLatestUpdates(`${article.title} ${article.location.name}`);
        setResult(response.text);
        setGroundingSources(response.groundingChunks || []);
      } else if (type === UpdateType.ALTERNATIVES) {
        const response = await findAlternatives(article.location.name, article.location.lat, article.location.lng);
        setResult(response.text);
        setGroundingSources(response.groundingChunks || []);
      } else if (type === UpdateType.SENTIMENT) {
        const text = await analyzeSentiment(article.content.join(" "));
        setResult(text);
      }
    } catch (e) {
      setResult("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const renderSources = () => {
    if (groundingSources.length === 0) return null;

    return (
      <div className="mt-4 pt-4 border-t border-stone-200">
        <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Sources</h4>
        <ul className="space-y-2">
          {groundingSources.map((chunk, idx) => {
            if (chunk.web) {
              return (
                <li key={idx} className="text-sm truncate">
                  <a href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                    <span className="mr-2">🔗</span>
                    {chunk.web.title}
                  </a>
                </li>
              );
            }
            if (chunk.maps) {
               return (
                <li key={idx} className="text-sm">
                  <a href={chunk.maps.uri} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline flex items-start">
                    <span className="mr-2 mt-1">📍</span>
                    <div>
                      <span className="font-semibold block">{chunk.maps.title}</span>
                      {chunk.maps.placeAnswerSources?.[0]?.reviewSnippets?.[0] && (
                          <span className="text-xs text-stone-500 italic">"{chunk.maps.placeAnswerSources[0].reviewSnippets[0].content}"</span>
                      )}
                    </div>
                  </a>
                </li>
               )
            }
            return null;
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden sticky top-6">
      <div className="p-4 bg-stone-900 text-white flex justify-between items-center">
        <h2 className="font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          Pulse AI
        </h2>
        <span className="text-xs text-stone-400 uppercase tracking-wider">Live Context</span>
      </div>

      <div className="p-2 grid grid-cols-3 gap-2 bg-stone-50 border-b border-stone-200">
        <button 
          onClick={() => handleAction(UpdateType.LATEST_NEWS)}
          className={`p-2 text-xs font-semibold rounded-lg transition-colors ${activeTab === UpdateType.LATEST_NEWS ? 'bg-orange-100 text-orange-800' : 'hover:bg-stone-200 text-stone-600'}`}
        >
          Check Updates
        </button>
        <button 
           onClick={() => handleAction(UpdateType.ALTERNATIVES)}
           className={`p-2 text-xs font-semibold rounded-lg transition-colors ${activeTab === UpdateType.ALTERNATIVES ? 'bg-orange-100 text-orange-800' : 'hover:bg-stone-200 text-stone-600'}`}
        >
          Find Books
        </button>
        <button 
           onClick={() => handleAction(UpdateType.SENTIMENT)}
           className={`p-2 text-xs font-semibold rounded-lg transition-colors ${activeTab === UpdateType.SENTIMENT ? 'bg-orange-100 text-orange-800' : 'hover:bg-stone-200 text-stone-600'}`}
        >
          Impact
        </button>
      </div>

      <div className="p-6 min-h-[300px] max-h-[60vh] overflow-y-auto">
        {!activeTab && (
          <div className="text-center text-stone-400 mt-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <p className="text-sm">Select a tool to enhance this story with real-time data.</p>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center h-40 space-y-4">
             <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-xs font-medium text-stone-500 animate-pulse">Consulting Gemini Models...</p>
          </div>
        )}

        {!loading && result && (
          <div className="animate-fade-in">
             <div className="prose prose-sm prose-stone">
               <p className="text-stone-800 leading-relaxed whitespace-pre-line">{result}</p>
             </div>
             {renderSources()}
          </div>
        )}
      </div>
      
      {activeTab && !loading && (
          <div className="p-3 bg-stone-50 text-xs text-center text-stone-400 border-t border-stone-200">
            AI-generated content may be inaccurate. Verify important details.
          </div>
      )}
    </div>
  );
};

export default AiSidebar;
