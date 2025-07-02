
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, FileText, ExternalLink, Calendar, User } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  source: string;
  type: 'document' | 'webpage' | 'database';
  relevance: number;
  date: string;
  author?: string;
}

const SearchInterface = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Deep Learning Applications in Natural Language Processing',
      snippet: 'This comprehensive study explores the latest advances in deep learning for NLP tasks, including transformer architectures, attention mechanisms, and their applications in sentiment analysis...',
      source: 'research_paper_1.pdf',
      type: 'document',
      relevance: 95,
      date: '2024-01-15',
      author: 'Dr. Sarah Johnson'
    },
    {
      id: '2',
      title: 'Machine Learning Fundamentals and Best Practices',
      snippet: 'A detailed overview of supervised and unsupervised learning techniques, covering decision trees, neural networks, and ensemble methods with practical implementation examples...',
      source: 'ml_handbook.pdf',
      type: 'document',
      relevance: 88,
      date: '2023-11-20',
      author: 'Prof. Michael Chen'
    },
    {
      id: '3',
      title: 'Recent Advances in Computer Vision Research',
      snippet: 'This paper discusses breakthrough developments in convolutional neural networks, object detection algorithms, and their real-world applications in autonomous systems...',
      source: 'cv_research.pdf',
      type: 'document',
      relevance: 82,
      date: '2024-02-08',
      author: 'Dr. Emily Rodriguez'
    },
    {
      id: '4',
      title: 'Stanford AI Research Database',
      snippet: 'Comprehensive database of artificial intelligence research papers, datasets, and experimental results from Stanford University\'s AI laboratory...',
      source: 'stanford.edu/ai-database',
      type: 'database',
      relevance: 75,
      date: '2024-03-01'
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchResults([]);

    // Simulate search delay
    setTimeout(() => {
      const filteredResults = mockResults.filter(result => 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.snippet.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(filteredResults.length > 0 ? filteredResults : mockResults);
      setIsSearching(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="h-4 w-4" />;
      case 'webpage': return <ExternalLink className="h-4 w-4" />;
      case 'database': return <Search className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document': return 'bg-blue-100 text-blue-800';
      case 'webpage': return 'bg-green-100 text-green-800';
      case 'database': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 90) return 'text-green-600';
    if (relevance >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredResults = searchResults.filter(result => {
    if (activeTab === 'all') return true;
    return result.type === activeTab;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Search Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search across documents, papers, and databases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 h-12 text-lg"
                disabled={isSearching}
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={!searchQuery.trim() || isSearching}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 px-8"
            >
              {isSearching ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Searching...
                </div>
              ) : (
                'Search'
              )}
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">
              machine learning
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">
              natural language processing
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">
              computer vision
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">
              deep learning
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">
              research methodology
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Search Results ({searchResults.length})</span>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">Sort by relevance</span>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Results</TabsTrigger>
                <TabsTrigger value="document">Documents</TabsTrigger>
                <TabsTrigger value="webpage">Web Pages</TabsTrigger>
                <TabsTrigger value="database">Databases</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-6">
                <div className="space-y-4">
                  {filteredResults.map((result) => (
                    <div
                      key={result.id}
                      className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Badge className={getTypeColor(result.type)}>
                            {getTypeIcon(result.type)}
                            <span className="ml-1 capitalize">{result.type}</span>
                          </Badge>
                          <span className={`text-sm font-medium ${getRelevanceColor(result.relevance)}`}>
                            {result.relevance}% match
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
                        {result.title}
                      </h3>
                      
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {result.snippet}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>{result.source}</span>
                        </div>
                        {result.author && (
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{result.author}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(result.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Search Tips */}
      {searchResults.length === 0 && !isSearching && (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Search Tips</CardTitle>
            <CardDescription className="text-blue-700">
              Get better results with these search strategies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Use specific keywords</h4>
                <p className="text-blue-700 text-sm">
                  Try "machine learning algorithms" instead of just "AI"
                </p>
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Combine terms</h4>
                <p className="text-blue-700 text-sm">
                  Use multiple related terms to narrow down results
                </p>
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Ask questions</h4>
                <p className="text-blue-700 text-sm">
                  "How does neural network training work?" finds explanatory content
                </p>
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Use quotes</h4>
                <p className="text-blue-700 text-sm">
                  "exact phrase" searches for that specific phrase
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchInterface;
